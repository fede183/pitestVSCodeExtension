/* global suite, test, teardown, setup */

// The module 'assert' provides assertion methods from node
const assert = require('assert');
// const myExtension = require('../extension');

//FileSystem
const fs = require("fs");

//Directory management
const { DirectoryManagement } = require('../../components/DirectoryManagement');

//Test Module
const { stackDirectory,
  	targetDirectory,
  	testCommandLineResults, } = require('../testModules/testDirModule');

const { buildProgram,
		cleanProgram, } = require('../testModules/testModule');

const { executeWhenTestCommandLineResultFileIsAvailable } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

suite("Stack Build Extension Tests", function() {
    setup("Clean", function() {
		cleanProgram();
    });

	teardown("Clean", function() {
		cleanProgram();
    });

	test("Stack Project directory exists", function() {
		assert(fs.existsSync(stackDirectory.getDir()));
	});

	test("Stack Project directory structure is correct", function() {
		assert(fs.existsSync(stackDirectory.addDir("src")));
		assert(fs.existsSync(stackDirectory.addDir("pom.xml")));
	});

	test("Stack Project src directory structure is correct", function() {
		const stackSrcDirectory = new DirectoryManagement(stackDirectory.addDir("src"));
		assert(fs.existsSync(stackSrcDirectory.addDir("main")));
		assert(fs.existsSync(stackSrcDirectory.addDir("test")));
	});

	test("Stack Project build no errors in build", function() {		
		buildProgram(stackDirectory);

		return new Promise((resolve, reject) => executeWhenTestCommandLineResultFileIsAvailable( 
			function(){
				const directories = ["classes", "coverage-reports", "maven-archiver", "maven-status", "site", 
				"surefire-reports", "test-classes", "stackar-1.0-SNAPSHOT.jar"];

				if(!fs.existsSync(targetDirectory.getDir())){
					reject("target");	
				}

				directories.forEach(directory => {
					if(!fs.existsSync(targetDirectory.addDir(directory))){
						reject(directory);	
					}
				});
				
				const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf8");
				if(fileContent.includes("[ERROR]")){
					reject();	
				}
				
				resolve();
		  }));
	}).timeout(defaultTestTimeout);
});
