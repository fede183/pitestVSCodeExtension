/* global suite, test */

import DirectoryManagement from '../DirectoryManagement';

// The module 'assert' provides assertion methods from node
const assert = require('assert');

const directoryForTests = __dirname;

suite("DirectoryManagement tests", function() {
	test("Directory is the same that constructor", function() {
		const directoryManagement = new DirectoryManagement(directoryForTests);
		assert(directoryManagement.getDir() === directoryForTests);
	});

	test("Directory is the original plus new directory", function() {
		const directoryManagement = new DirectoryManagement(directoryForTests);
		directoryManagement.addDir("otherDirectoryOrFile");
		assert(directoryManagement.getDir() === directoryForTests + "/otherDirectoryOrFile");
	});
});