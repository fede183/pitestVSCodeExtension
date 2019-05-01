/* global suite, test */

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

//rm -rf
const rimraf = require('rimraf');

//StackDirectory
const stackDirectory = __dirname + "/Stack"

suite("Stack Extension Tests", function() {

	test("Stack Project directory exists", function() {
		assert.ok(fs.existsSync(stackDirectory));
	});

	test("Stack Project directory structure is correct", function() {
		assert.ok(fs.existsSync(stackDirectory + "/src"));
		assert.ok(fs.existsSync(stackDirectory + "/pom.xml"));
	});

	test("Stack Project src directory structure is correct", function() {
		assert.ok(fs.existsSync(stackDirectory + "/src/main"));
		assert.ok(fs.existsSync(stackDirectory + "/src/test"));
	});

	test("Stack Project build target directory exists", function() {
		if(fs.existsSync(stackDirectory + "/target")){
			rimraf(stackDirectory + "/target", () => null);
		}

		Promise.all([vscode.commands.executeCommand('extension.buildProgram')]).then(
		() => {
			assert.ok(fs.existsSync(stackDirectory + "/target"));
			rimraf(stackDirectory + "/target", () => null);
			assert.ok(!fs.existsSync(stackDirectory + "/target"));
		});
	});

	test("Stack Project build target directory structure is correct", function() {
		const targetDirectory = stackDirectory + "/target";
		Promise.all([vscode.commands.executeCommand('extension.buildProgram')]).then(
		() => {
			assert.ok(fs.existsSync(targetDirectory));			
			assert.ok(fs.existsSync(targetDirectory + "/classes"));
			assert.ok(fs.existsSync(targetDirectory + "/coverage-reports"));
			assert.ok(fs.existsSync(targetDirectory + "/maven-archiver"));
			assert.ok(fs.existsSync(targetDirectory + "/maven-status"));
			assert.ok(fs.existsSync(targetDirectory + "/site"));
			assert.ok(fs.existsSync(targetDirectory + "/surefire-reports"));
			assert.ok(fs.existsSync(targetDirectory + "/test-classes"));
			assert.ok(fs.existsSync(targetDirectory + "/stackar-1.0-SNAPSHOT.jar"));

			rimraf(targetDirectory, () => null);
			assert.ok(!fs.existsSync(targetDirectory));
		});
	});
});
