/* global suite, test */

const DirectoryManagement = require('../DirectoryManagement');

// The module 'assert' provides assertion methods from node
const assert = require('assert');

const directoryForTests = __dirname;

suite("DirectoryManagement tests", function() {
	test("Directory is the same that constructor", function() {
		const directoryManagement = new DirectoryManagement.directoryManagement(directoryForTests);
		assert(directoryManagement.getDir() === directoryForTests);
	});

	test("Directory is the original plus new directory", function() {
		const directoryManagement = new DirectoryManagement.directoryManagement(directoryForTests);
		directoryManagement.addDir("otherDirectoryOrFile");
		assert(directoryManagement.getDir() === directoryForTests + "/otherDirectoryOrFile");
	});
});