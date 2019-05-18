/* global suite, test, teardown */

// The module 'assert' provides assertion methods from node
const assert = require('assert');

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
	terminal.sendText(command + '> ' + testCommandLineResults);
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
	vscode.window.terminals.forEach(terminal => {
		terminal.dispose();
	});
}

suite("Stack Build Extension Tests", function() {

	teardown("Clean", function() {
		cleanProgram();
	});

	test("Stack Project directory exists", function() {
		assert(fs.existsSync(stackDirectory));
	});

	test("Stack Project directory structure is correct", function() {
		assert(fs.existsSync(stackDirectory + "/src"));
		assert(fs.existsSync(stackDirectory + "/pom.xml"));
	});

	test("Stack Project src directory structure is correct", function() {
		assert(fs.existsSync(stackDirectory + "/src/main"));
		assert(fs.existsSync(stackDirectory + "/src/test"));
	});

	test("Stack Project build target structure is correct", function() {
		buildProgram(stackDirectory);
		return new Promise((resolve, reject) => setTimeout(function(){
			// Assert here.
			if(!fs.existsSync(stackDirectory + "/target")){
				reject();	
			}
			if(!fs.existsSync(targetDirectory)){
				reject("target");	
			}
			if(!fs.existsSync(targetDirectory + "/classes")){
				reject("classes");	
			}
			if(!fs.existsSync(targetDirectory + "/coverage-reports")){
				reject("coverage-reports");	
			}
			if(!fs.existsSync(targetDirectory + "/maven-archiver")){
				reject("maven-archiver");	
			}
			if(!fs.existsSync(targetDirectory + "/maven-status")){
				reject("maven-status");	
			}
			if(!fs.existsSync(targetDirectory + "/site")){
				reject("site");	
			}
			if(!fs.existsSync(targetDirectory + "/surefire-reports")){
				reject("surefire-reports");	
			}
			if(!fs.existsSync(targetDirectory + "/test-classes")){
				reject("test-classes");	
			}
			if(!fs.existsSync(targetDirectory + "/stackar-1.0-SNAPSHOT.jar")){
				reject("stackar-1.0-SNAPSHOT.jar");	
			}
			resolve();
		  }, 5000));
	}).timeout('6s');

	test("Stack Project build no errors in build", function() {
		buildProgram(stackDirectory);
		return new Promise((resolve, reject) => setTimeout(function(){
			// Assert here.
			const fileContent = fs.readFileSync(testCommandLineResults, "utf8");
			if(fileContent.includes("[ERROR]")){
				reject();	
			}
			resolve();
		  }, 5000));
	}).timeout('6s');
});

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

	
});
