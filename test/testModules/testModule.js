// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

//FileSystem
const fs = require("fs");

//Directories
const { testCommandLineResults, targetDirectory } = require('./testDirModule');

//Build Project
const buildProgram = /**
 * @param {{ addDir: (arg0: string) => import("fs").PathLike; getDir: () => string; }} projectDirectory
 */
 function(projectDirectory) {
	if (!fs.existsSync(projectDirectory.addDir("pom.xml"))) {
		return;
	}
	const terminal = vscode.window.createTerminal();
	terminal.show();
	terminal.sendText('cd ' + projectDirectory.getDir());
	printCommandResults(terminal, 'mvn clean install');
}

//Print command results
/**
 * @param {import("vscode").Terminal} terminal
 * @param {string} command
 */
const printCommandResults = (terminal, command) => {
	terminal.sendText(command + ' > ' + testCommandLineResults.getDir());
}

//Clean Project
const cleanProgram = () => {
	if(fs.existsSync(targetDirectory.getDir())){
		const rimraf = require('rimraf');
		rimraf(targetDirectory.getDir(), () => {});
	}
	if(fs.existsSync(testCommandLineResults.getDir())){
		fs.unlinkSync(testCommandLineResults.getDir());
	}
	cleanOutputFileConfiguration();
	vscode.window.terminals.forEach(terminal => {
		terminal.dispose();
	});
}

//Clean output file configuration
const cleanOutputFileConfiguration = () => {
	let config = vscode.workspace.getConfiguration("saveResult");

	let saveInOutPutFile = "saveInOutPutFile";
	let setAsGlobal = config.inspect(saveInOutPutFile).workspaceValue == undefined;
	config.update(saveInOutPutFile, false, setAsGlobal);

	let outPutFile = "outPutFile";
	setAsGlobal = config.inspect(outPutFile).workspaceValue == undefined;
	config.update(outPutFile, null, setAsGlobal);
}

//Set output file configuration
const setOutputFileConfiguration = () => {
	let config = vscode.workspace.getConfiguration("saveResult");

	let saveInOutPutFile = "saveInOutPutFile";
	let setAsGlobal = config.inspect(saveInOutPutFile).workspaceValue == undefined;
	config.update(saveInOutPutFile, true, setAsGlobal);

	let outPutFile = "outPutFile";
	setAsGlobal = config.inspect(outPutFile).workspaceValue == undefined;
	config.update(outPutFile, testCommandLineResults, setAsGlobal);
}

module.exports = {
    buildProgram,
    printCommandResults,
    cleanProgram,
    cleanOutputFileConfiguration,
    setOutputFileConfiguration,
}