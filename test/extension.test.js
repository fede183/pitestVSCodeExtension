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

//StackDirectory
const stackDirectory = __dirname + "/Stack"

suite("Stack Extension Tests", function() {

	test("Stack Project directory exits", function() {
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

	test("Stack Project build", function() {
		Promise.all([vscode.commands.executeCommand('extension.buildProgram')]).then(
		() => assert.ok(fs.existsSync(stackDirectory + "/target")));
	});
});
