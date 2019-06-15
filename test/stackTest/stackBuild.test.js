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
    testCommandLineResults,
    buildProgram,
    cleanProgram,
    defaultSmallTimeout,
		timeoutForSmall,
		defaultMediumTimeout,
		timeoutForMedium } = require('../testModule');

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

	test("Stack Project build target structure is correct", function() {		
		buildProgram(stackDirectory);
		return new Promise((resolve, reject) => setTimeout(function(){
			//debugger
			if(!fs.existsSync(targetDirectory.getDir())){
				reject("target");	
			}
			if(!fs.existsSync(targetDirectory.addDir("classes"))){
				reject("classes");	
			}
			if(!fs.existsSync(targetDirectory.addDir("coverage-reports"))){
				reject("coverage-reports");	
			}
			if(!fs.existsSync(targetDirectory.addDir("maven-archiver"))){
				reject("maven-archiver");	
			}
			if(!fs.existsSync(targetDirectory.addDir("maven-status"))){
				reject("maven-status");	
			}
			if(!fs.existsSync(targetDirectory.addDir("site"))){
				reject("site");	
			}
			if(!fs.existsSync(targetDirectory.addDir("surefire-reports"))){
				reject("surefire-reports");	
			}
			if(!fs.existsSync(targetDirectory.addDir("test-classes"))){
				reject("test-classes");	
			}
			if(!fs.existsSync(targetDirectory.addDir("stackar-1.0-SNAPSHOT.jar"))){
				reject("stackar-1.0-SNAPSHOT.jar");	
			}
			resolve();
		  }, defaultSmallTimeout));
	}).timeout(timeoutForSmall);

	test("Stack Project build no errors in build", function() {
		buildProgram(stackDirectory);
		return new Promise((resolve, reject) => setTimeout(function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf8");
			if(fileContent.includes("[ERROR]")){
				reject();	
			}
			resolve();
		  }, defaultMediumTimeout));
	}).timeout(timeoutForMedium);
});
