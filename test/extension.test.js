/* global suite, test, teardown */

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

//FileSystem
const fs = require("fs");

const stackDirectory = __dirname + "/Stack";

const emptyDirectory = stackDirectory + "/Empty";

const targetDirectory = stackDirectory + "/target";

const testCommandLineResults = __dirname + '/testCommandLineResults';

//Build Project
const buildProgram = function(projectDirectory) {
	if (!fs.existsSync(projectDirectory + "/pom.xml")) {
		return;
	}
	const terminal = vscode.window.createTerminal();
	terminal.show();
	terminal.sendText('cd ' + projectDirectory);
	printCommandResults(terminal, 'mvn clean install');
}

//Print command results
const printCommandResults = (terminal, command) => {
	terminal.sendText(command + ' > ' + testCommandLineResults);
}

//Clean Project
const cleanProgram = () => {
	if(fs.existsSync(targetDirectory)){
		const rimraf = require('rimraf');
		rimraf(targetDirectory, () => {});
	}
	if(fs.existsSync(testCommandLineResults)){
		fs.unlinkSync(testCommandLineResults);
	}
	cleanOutputFileConfiguration();
	vscode.window.terminals.forEach(terminal => {
		terminal.dispose();
	});
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

suite("Stack Pitest Execution Extension Tests", function() {
	teardown("Clean", function() {
		cleanProgram();
	});

	test("Stack Project pitest directories exists", function() {
		buildProgram(stackDirectory);
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), 5000);
		return new Promise((resolve, reject) => setTimeout(function(){
			// Assert here.
			if(!fs.existsSync(targetDirectory + "/pit-reports")){
				reject();	
			}

			resolve();
		  }, 10000));
	}).timeout('11s');

	test("Stack Project pitest in file without pom file", function() {
		buildProgram(emptyDirectory);
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), 5000);
		return new Promise((resolve) => setTimeout(function(){
			resolve();
		  }, 10000));
	}).timeout('11s');

	test("Stack Project pitest without an open terminal", function() {
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), 5000);
		return new Promise((resolve) => setTimeout(function(){
			resolve();
		  }, 10000));
	}).timeout('11s');

	test("Stack Project pitest directories exists(with output file configuration)", function() {
		buildProgram(stackDirectory);
		setOutputFileConfiguration();
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), 5000);
		return new Promise((resolve, reject) => setTimeout(function(){
			// Assert here.
			if(!fs.existsSync(targetDirectory + "/pit-reports")){
				reject();	
			}

			const fileContent = fs.readFileSync(testCommandLineResults, "utf8");
			if(fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }, 10000));
	}).timeout('11s');

	test("Stack Project pitest in file without pom file(with output file configuration)", function() {
		buildProgram(emptyDirectory);
		setOutputFileConfiguration();
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), 5000);
		return new Promise((resolve, reject) => setTimeout(function(){
			const fileContent = fs.readFileSync(testCommandLineResults, "utf8");
			if(!fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }, 10000));
	}).timeout('11s');

	test("Stack Project pitest without an open terminal(with output file configuration)", function() {
		setOutputFileConfiguration();
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), 5000);
		return new Promise((resolve, reject) => setTimeout(function(){
			const fileContent = fs.readFileSync(testCommandLineResults, "utf8");
			if(!fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }, 10000));
	}).timeout('11s');
});
