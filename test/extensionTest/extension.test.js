/* global suite, test, teardown, setup */

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

//FileSystem
const fs = require("fs");

//Test Module
const { stackDirectory,
	emptyDirectory,
  	targetDirectory,
  	testCommandLineResults, } = require('../testModules/testDirModule');

const { buildProgram,
		cleanProgram,
		setOutputFileConfiguration, } = require('../testModules/testModule');

		const {executeWhenFileIsAvailable,
			executeWhenBuildIsDone,
			executeWhenPitestIsDone,
			executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

suite("Stack Pitest Execution Extension Tests", function() {
	setup("Clean", function() {
		cleanProgram();
	});

	teardown("Clean", function() {
		cleanProgram();
	});

	test("Stack Project pitest directories exists", function() {
		buildProgram(stackDirectory);
		executeWhenBuildIsDone(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenPitestIsDone(function(){
			if(!fs.existsSync(targetDirectory.addDir("pit-reports"))){
				reject();	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest directories exists(with output file configuration)", function() {
		buildProgram(stackDirectory);
		executeWhenBuildIsDone(() => setOutputFileConfiguration());
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenPitestIsDone(
			function(){
				if(!fs.existsSync(targetDirectory.addDir("pit-reports"))){
					reject();	
				}

				const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf16le");
				if(fileContent.includes("[ERROR]")){
					reject();	
				}

				resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest in file without pom file(with output file configuration)", function() {
		buildProgram(emptyDirectory);
		setOutputFileConfiguration();
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenFileIsAvailable(
			testCommandLineResults.getDir(), function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf16le");
			if(!fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest without an open terminal(with output file configuration)", function() {
		setOutputFileConfiguration();
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenFileIsAvailable(
			testCommandLineResults.getDir(), function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf16le");
			if(!fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);
});
