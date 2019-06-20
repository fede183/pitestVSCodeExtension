/* global suite, test */

const { DirectoryManagement } = require('../../components/DirectoryManagement');

// The module 'assert' provides assertion methods from node
const assert = require('assert');

const directoryForTests = __dirname;

suite("DirectoryManagement tests", function() {
	test("Directory is the same that the constructor", function() {
		const directoryManagement = new DirectoryManagement(directoryForTests);

		assert(directoryManagement.getDir() === directoryForTests);
	});

	test("Directory is the same that the constructor(for another management)", function() {
		const directoryManagement = new DirectoryManagement(directoryForTests);
		const directoryManagementCopy = new DirectoryManagement(directoryManagement);
		
		assert(directoryManagementCopy.getDir() === directoryForTests);
	});

	test("Directory is the original plus new directory", function() {
		const directoryManagement = new DirectoryManagement(directoryForTests);
		assert(directoryManagement.addDir("otherDirectoryOrFile") === directoryForTests + "/otherDirectoryOrFile");
	});

	test("Directory is the original plus new directory(for another management)", function() {
		const directoryManagement = new DirectoryManagement(directoryForTests);
		const directoryManagementCopy = new DirectoryManagement(directoryManagement.addDir("otherDirectoryOrFile"));
		
		assert(directoryManagementCopy.getDir() === directoryForTests + "/otherDirectoryOrFile");
	});
});