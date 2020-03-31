const vscode = require('vscode');

const fs = require("fs");

const { testCommandLineResults, targetDirectory } = require('./testDirModule');

const { cleanAllProperties } = require('./cleanAllProperties');

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

//Build Project
const buildProgramAndExitTerminal = /**
 * @param {{ addDir: (arg0: string) => import("fs").PathLike; getDir: () => string; }} projectDirectory
 */
 function(projectDirectory) {
	if (!fs.existsSync(projectDirectory.addDir("pom.xml"))) {
		return;
	}
	const terminal = vscode.window.createTerminal();
	terminal.show();
	terminal.sendText('cd ' + projectDirectory.getDir());
	printCommandResults(terminal, 'mvn clean install ; exit');
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
	if (fs.existsSync(targetDirectory.getDir())) {
		const rimraf = require('rimraf');
		rimraf(targetDirectory.getDir(), () => {});
	}
	if (fs.existsSync(testCommandLineResults.getDir())) {
		fs.unlinkSync(testCommandLineResults.getDir());
	}
	
	cleanAllProperties();

	vscode.window.terminals.forEach(terminal => {
		terminal.dispose();
	});
}

module.exports = {
    buildProgram,
    printCommandResults,
	cleanProgram,
	buildProgramAndExitTerminal,
}