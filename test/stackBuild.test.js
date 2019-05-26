/* global suite, test, teardown */

// The module 'assert' provides assertion methods from node
const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

//FileSystem
const fs = require("fs");

//Directory management
const { DirectoryManagement } = require('../components/DirectoryManagement');

const dirName = new DirectoryManagement(__dirname);

const stackDirectory = new DirectoryManagement(dirName.addDir("Stack"));

const targetDirectory = new DirectoryManagement(stackDirectory.addDir("target"));

const testCommandLineResults = new DirectoryManagement(dirName.addDir("testCommandLineResults"));

//Build Project
const buildProgram = function(projectDirectory) {
	if (!fs.existsSync(projectDirectory.addDir("pom.xml"))) {
		return;
	}
	const terminal = vscode.window.createTerminal();
	terminal.show();
	terminal.sendText('cd ' + projectDirectory.getDir());
	printCommandResults(terminal, 'mvn clean install');
}

//Print command results
const printCommandResults = (terminal, command) => {
	terminal.sendText(command + ' > ' + testCommandLineResults.getDir());
}

//Clean Project
const cleanProgram = () => {
	if(fs.existsSync(targetDirectory.getDir())){
		const rimraf = require('rimraf');
		rimraf(targetDirectory.getDir(), () => {});
	}
	if(fs.existsSync(testCommandLineResults.getDir())){
		fs.unlinkSync(testCommandLineResults.getDir());
	}
	cleanOutputFileConfiguration();
	vscode.window.terminals.forEach(terminal => {
		terminal.dispose();
	});
}

//Clean output file configuration
const cleanOutputFileConfiguration = () => {
	let config = vscode.workspace.getConfiguration("saveResult");

	let saveInOutPutFile = "saveInOutPutFile";
	let setAsGlobal = config.inspect(saveInOutPutFile).workspaceValue == undefined;
	config.update(saveInOutPutFile, false, setAsGlobal);

	let outPutFile = "outPutFile";
	setAsGlobal = config.inspect(outPutFile).workspaceValue == undefined;
	config.update(outPutFile, null, setAsGlobal);
}

const defaultTimeout = 50000;

const timeoutToStringTime = (timeout) => (timeout/1000) + 's';

suite("Stack Build Extension Tests", function() {

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
		  }, defaultTimeout));
	}).timeout(timeoutToStringTime(defaultTimeout + 10000));

	test("Stack Project build no errors in build", function() {
		buildProgram(stackDirectory);
		return new Promise((resolve, reject) => setTimeout(function(){
			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), "utf8");
			if(fileContent.includes("[ERROR]")){
				reject();	
			}
			resolve();
		  }, defaultTimeout));
	}).timeout(timeoutToStringTime(defaultTimeout + 10000));
});
