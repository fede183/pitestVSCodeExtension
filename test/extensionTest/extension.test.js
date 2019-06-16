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
  	testCommandLineResults,
  	buildProgram,
	cleanProgram,
	setOutputFileConfiguration,
	timeoutForMedium,
	timeoutForLarge,
	executeWhenFileIsAvailable,
	executeWhenConditionIsReach,
	conditionForSaveResultSet,
	executeWhenBuildIsDone,
	executeWhenPitestIsDone,
	executeWhenPitestIsDoneForEmpty, } = require('../testModule');

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
	}).timeout(timeoutForMedium);

	test("Stack Project pitest in file without pom file", function() {
		buildProgram(emptyDirectory);
		vscode.commands.executeCommand('extension.pitest');
		return new Promise((resolve) => executeWhenPitestIsDoneForEmpty(
			function(){
				resolve();
			}));
	}).timeout(timeoutForMedium);

	test("Stack Project pitest directories exists(with output file configuration)", function() {
		buildProgram(stackDirectory);
		executeWhenBuildIsDone(() => setOutputFileConfiguration());
		executeWhenConditionIsReach(conditionForSaveResultSet, () => vscode.commands.executeCommand('extension.pitest'));
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
	}).timeout(timeoutForLarge);

	test("Stack Project pitest in file without pom file(with output file configuration)", function() {
		buildProgram(emptyDirectory);
		setOutputFileConfiguration();
		executeWhenConditionIsReach(conditionForSaveResultSet, () => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenFileIsAvailable(
			testCommandLineResults.getDir(), function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf16le");
			if(!fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }));
	}).timeout(timeoutForLarge);

	test("Stack Project pitest without an open terminal(with output file configuration)", function() {
		setOutputFileConfiguration();
		executeWhenConditionIsReach(conditionForSaveResultSet, () => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenFileIsAvailable(
			testCommandLineResults.getDir(), function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf16le");
			if(!fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }));
	}).timeout(timeoutForMedium);
});
