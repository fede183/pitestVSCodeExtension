// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

//FileSystem
const fs = require("fs");

//Directory management
const { DirectoryManagement } = require('../components/DirectoryManagement');

const dirName = new DirectoryManagement(__dirname);

const stackDirectory = new DirectoryManagement(dirName.addDir("Stack"));

const emptyDirectory = new DirectoryManagement(dirName.addDir("Empty"));

const targetDirectory = new DirectoryManagement(stackDirectory.addDir("target"));

const testCommandLineResults = new DirectoryManagement(dirName.addDir("testCommandLineResults"));

//Build Project
const buildProgram = function(projectDirectory) {
	if (!fs.existsSync(projectDirectory.addDir("pom.xml"))) {
		return;
	}
	const terminal = vscode.window.createTerminal();
	terminal.show();
	terminal.sendText('cd ' + projectDirectory.getDir());
	printCommandResults(terminal, 'mvn clean install');
}

//Print command results
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

const defaultSmallTimeout = 20000;

const defaultMediumTimeout = defaultSmallTimeout*2;

const defaultLargeTimeout = defaultSmallTimeout*3;

const timeoutToStringTime = (timeout) => (timeout/1000) + 's';

const timeoutForSmall = timeoutToStringTime(defaultSmallTimeout + 20000);

const timeoutForMedium = timeoutToStringTime(defaultMediumTimeout + 20000);

const timeoutForLarge = timeoutToStringTime(defaultLargeTimeout + 20000);

module.exports = {
    dirName,
    stackDirectory,
    emptyDirectory,
    targetDirectory,
    testCommandLineResults,
    buildProgram,
    printCommandResults,
    cleanProgram,
    cleanOutputFileConfiguration,
    setOutputFileConfiguration,
    defaultLargeTimeout,
	defaultSmallTimeout,
	defaultMediumTimeout,
	timeoutToStringTime,
	timeoutForMedium,
	timeoutForLarge,
}