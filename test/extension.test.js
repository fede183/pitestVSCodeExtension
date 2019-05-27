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
	defaultLargeTimeout,
	defaultSmallTimeout,
	defaultMediumTimeout,
	timeoutForMedium,
	timeoutForLarge, } = require('./testModule');

suite("Stack Pitest Execution Extension Tests", function() {
	setup("Clean", function() {
		cleanProgram();
	});

	teardown("Clean", function() {
		cleanProgram();
	});

	test("Stack Project pitest directories exists", function() {
		buildProgram(stackDirectory);
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), defaultSmallTimeout);
		return new Promise((resolve, reject) => setTimeout(function(){
			if(!fs.existsSync(targetDirectory.addDir("pit-reports"))){
				reject();	
			}

			resolve();
		  }, defaultMediumTimeout));
	}).timeout(timeoutForMedium);

	test("Stack Project pitest in file without pom file", function() {
		buildProgram(emptyDirectory);
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), defaultSmallTimeout);
		return new Promise((resolve) => setTimeout(function(){
			resolve();
		  }, defaultMediumTimeout));
	}).timeout(timeoutForMedium);

	test("Stack Project pitest without an open terminal", function() {
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), defaultSmallTimeout);
		return new Promise((resolve) => setTimeout(function(){
			resolve();
		  }, defaultMediumTimeout));
	}).timeout(timeoutForMedium);

	test("Stack Project pitest directories exists(with output file configuration)", function() {
		buildProgram(stackDirectory);
		setTimeout(() => setOutputFileConfiguration(), defaultSmallTimeout);
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), defaultMediumTimeout);
		return new Promise((resolve, reject) => setTimeout(function(){
			if(!fs.existsSync(targetDirectory.addDir("pit-reports"))){
				reject();	
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf8");
			if(fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }, defaultLargeTimeout));
	}).timeout(timeoutForLarge);

	test("Stack Project pitest in file without pom file(with output file configuration)", function() {
		buildProgram(emptyDirectory);
		setTimeout(() => setOutputFileConfiguration(), defaultSmallTimeout);
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), defaultMediumTimeout);
		return new Promise((resolve, reject) => setTimeout(function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf8");
			if(!fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }, defaultLargeTimeout));
	}).timeout(timeoutForLarge);

	test("Stack Project pitest without an open terminal(with output file configuration)", function() {
		setOutputFileConfiguration();
		setTimeout(() => vscode.commands.executeCommand('extension.pitest'), defaultSmallTimeout);
		return new Promise((resolve, reject) => setTimeout(function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf8");
			if(!fileContent.includes("[ERROR]")){
				reject();	
			}

			resolve();
		  }, defaultMediumTimeout));
	}).timeout(timeoutForMedium);
});
