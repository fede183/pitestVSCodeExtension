/* global suite, test, setup, suiteTeardown */

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

const { buildProgram, cleanProgram, } = require('../testModules/testModule');

		
const {	setOutputFileConfiguration, setMavenExecutionConfiguration, } = require('../testModules/setProperties');

const {
	executeWhenBuildIsDone,
	executeWhenPitestIsDone,
	executeWhenForSaveResultSet,
	executeWhenTestCommandLineResultFileIsAvailable,
	executeWhenForMavenExecutionSet, } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

suite("Stack Pitest Execution Extension Tests", function() {
	setup(function() {
		cleanProgram();
	});

	suiteTeardown(function() {
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

	test("Stack Project pitest with pom file(with output file configuration)", function() {
		buildProgram(stackDirectory);
		executeWhenBuildIsDone(() => setOutputFileConfiguration());
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenPitestIsDone(
			function(){

				const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf8");
				if(fileContent.includes("[ERROR]")){
					reject("testCommandLineResults");	
				}

				resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest in file without pom file(with output file configuration)", function() {
		buildProgram(emptyDirectory);
		setOutputFileConfiguration();
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenTestCommandLineResultFileIsAvailable(function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf8");
			if(!fileContent.includes("[ERROR]")){
				reject("testCommandLineResults");	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest without an open terminal(with output file configuration)", function() {
		setOutputFileConfiguration();
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenTestCommandLineResultFileIsAvailable(function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf8");
			if(!fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project maven execution custom directory", function() {
		buildProgram(stackDirectory);
		setOutputFileConfiguration();
		setMavenExecutionConfiguration();
		executeWhenBuildIsDone(() => {
			executeWhenForSaveResultSet(() => {
				executeWhenForMavenExecutionSet(() => {
					vscode.commands.executeCommand('extension.pitest');
				});
			});
		});
		return new Promise((resolve, reject) => executeWhenPitestIsDone(function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf8");
			if(fileContent.includes("[ERROR]")){
				reject("testCommandLineResults");	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);
});
