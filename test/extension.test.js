/* global suite, test, teardown */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

//FileSystem
const fs = require("fs");

//StackDirectory
const stackDirectory = __dirname + "/Stack";

//TargetDirectory
const targetDirectory = stackDirectory + "/target";

//Build Project
const buildProgram = () => {
	const terminal = vscode.window.createTerminal();
	terminal.show();
	terminal.sendText('cd ' + stackDirectory);
	terminal.sendText('mvn clean install');
}

suite("Stack Extension Tests", function() {

	teardown("Clean", function() {
		if(fs.existsSync(targetDirectory)){
			const rimraf = require('rimraf');
			rimraf(targetDirectory, () => {});
		}
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

	test("Stack Project build taget directory exists", function() {
		buildProgram();
		return new Promise((resolve, reject) => setTimeout(function(){
			// Assert here.
			if(!fs.existsSync(stackDirectory + "/target")){
				reject();	
			}
			resolve();
		  }, 5000));
	}).timeout('6s');

	test("Stack Project build target directory structure is correct", function() {
		buildProgram();
		return new Promise((resolve, reject) => setTimeout(function(){
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
});
