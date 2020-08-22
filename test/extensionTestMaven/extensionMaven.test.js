/* global suite, test, setup, suiteTeardown */

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');

//FileSystem
const fs = require("fs");

//Test Module
const { stackDirectory,
	emptyDirectory,
  	targetDirectory,
	testCommandLineResults,
	readMode, } = require('../testModules/testDirModule');

const { buildProgramAndExitTerminal, cleanProgram, } = require('../testModules/testModule');
		
const {	setDefaultConfiguration, } = require('../testModules/setProperties');

const { executeWhenBuildIsDone,
	executeWhenPitestIsDone,
	executeWhenForSaveResultSet,
	executeWhenTestCommandLineResultFileIsAvailable,
	executeWhenForWithHistorySet,
	executeWhenForMutationThresholdSet,
	executeWhenForIncludeSet,
	executeWhenForGoalSet,
	executeWhenForMutatorsSet,
	executeWhenForTimeoutConstantSet,
	executeWhenForTimeoutFactorSet, } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');

const { mutationCommand } = require('../../terminalCommand');

const getErrorMessageForMutationCommand = (expected, actual) => "Expected mutation command: " + expected + 
" vs actual mutation command: " + actual 

suite("Stack Pitest Execution Extension Tests for Maven", function() {
	setup(function() {
		cleanProgram();
	});

	suiteTeardown(function() {
		cleanProgram();
	});

	test("Stack Project pitest directories exists for Maven", function() {
		buildProgramAndExitTerminal(stackDirectory);
		executeWhenBuildIsDone(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenPitestIsDone(function() {
			const expectedMutationCommand = "mvn org.pitest:pitest-maven:mutationCoverage"; 
			const actualMutationCommand = mutationCommand();
			
			if (actualMutationCommand !== expectedMutationCommand) {
				reject(getErrorMessageForMutationCommand(expectedMutationCommand, actualMutationCommand));
			}

			if (!fs.existsSync(targetDirectory.addDir("pit-reports"))) {
				reject("pit-reports doesn't exists");	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest with pom file (with output file configuration) for Maven", function() {
		buildProgramAndExitTerminal(stackDirectory);
		executeWhenBuildIsDone(() => setDefaultConfiguration("saveResult"));
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenPitestIsDone(
			function() {
				const expectedMutationCommand = `mvn org.pitest:pitest-maven:mutationCoverage > ${testCommandLineResults.getDir()}`; 
				const actualMutationCommand = mutationCommand();
				
				if (actualMutationCommand !== expectedMutationCommand) {
					reject(getErrorMessageForMutationCommand(expectedMutationCommand, actualMutationCommand));
				}

				const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
				if (fileContent.includes("[ERROR]")) {
					reject("testCommandLineResults");	
				}

				resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest in file without pom file (with output file configuration) for Maven", function() {
		buildProgramAndExitTerminal(emptyDirectory);
		setDefaultConfiguration("saveResult");
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenTestCommandLineResultFileIsAvailable(function() {
			const expectedMutationCommand = `mvn org.pitest:pitest-maven:mutationCoverage > ${testCommandLineResults.getDir()}`; 
			const actualMutationCommand = mutationCommand();
			
			if (actualMutationCommand !== expectedMutationCommand) {
				reject(getErrorMessageForMutationCommand(expectedMutationCommand, actualMutationCommand));
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
			if (!fileContent.includes("[ERROR]")) {
				reject("testCommandLineResults");	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest without an open terminal (with output file configuration) for Maven", function() {
		setDefaultConfiguration("saveResult");
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenTestCommandLineResultFileIsAvailable(function() {
			const expectedMutationCommand = `mvn org.pitest:pitest-maven:mutationCoverage > ${testCommandLineResults.getDir()}`; 
			const actualMutationCommand = mutationCommand();
			
			if (actualMutationCommand !== expectedMutationCommand) {
				reject(getErrorMessageForMutationCommand(expectedMutationCommand, actualMutationCommand));
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
			if (!fileContent.includes("[ERROR]")) {
				reject();	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	const propertyTest = (set, execute, command) => {
		buildProgramAndExitTerminal(stackDirectory);
		setDefaultConfiguration("saveResult");
		set();
		executeWhenBuildIsDone(() => {
			executeWhenForSaveResultSet(() => {
				execute(() => {
					vscode.commands.executeCommand('extension.pitest');
				});
			});
		});
		return new Promise((resolve, reject) => executeWhenPitestIsDone(function() {
			const expectedMutationCommand = command; 
			const actualMutationCommand = mutationCommand();
			
			if (actualMutationCommand !== expectedMutationCommand) {
				reject(getErrorMessageForMutationCommand(expectedMutationCommand, actualMutationCommand));
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
			if (fileContent.includes("[ERROR]")) {
				reject("testCommandLineResults");	
			}

			resolve();
		  }));
	}

	// test("Stack Project maven execution custom directory", () => propertyTest(setMavenExecutionConfiguration, executeWhenForMavenExecutionSet,
	// 	`../maven/bin/mvn org.pitest:pitest-maven:mutationCoverage > ${testCommandLineResults.getDir()}`)
	// ).timeout(defaultTestTimeout);

	test("Stack Project with history for Maven", () => propertyTest(() => setDefaultConfiguration("withHistory"), executeWhenForWithHistorySet,
		`mvn org.pitest:pitest-maven:mutationCoverage -DwithHistory > ${testCommandLineResults.getDir()}`)
	).timeout(defaultTestTimeout);
	
	test("Stack Project mutation threshold for Maven", () => propertyTest(() => setDefaultConfiguration("mutationThreshold"), executeWhenForMutationThresholdSet,
		`mvn org.pitest:pitest-maven:mutationCoverage -DmutationThreshold=${85} > ${testCommandLineResults.getDir()}`)
	).timeout(defaultTestTimeout);

	test("Stack Project mutators for Maven", () => propertyTest(() => setDefaultConfiguration("mutators"), executeWhenForMutatorsSet,
		`mvn org.pitest:pitest-maven:mutationCoverage -Dmutators=CONSTRUCTOR_CALLS,NON_VOID_METHOD_CALLS > ${testCommandLineResults.getDir()}`)
	).timeout(defaultTestTimeout);

	test("Stack Project timeoutConstant for Maven", () => propertyTest(() => setDefaultConfiguration("timeoutConstant"), executeWhenForTimeoutConstantSet,
		`mvn org.pitest:pitest-maven:mutationCoverage -DtimeoutConstant=6000 > ${testCommandLineResults.getDir()}`)
	).timeout(defaultTestTimeout);

	test("Stack Project timeoutFactor for Maven", () => propertyTest(() => setDefaultConfiguration("timeoutFactor"), executeWhenForTimeoutFactorSet,
		`mvn org.pitest:pitest-maven:mutationCoverage -DtimeoutFactor=2 > ${testCommandLineResults.getDir()}`)
	).timeout(defaultTestTimeout);

	test.skip("Stack Project goal", function() {
		buildProgramAndExitTerminal(stackDirectory);
		setDefaultConfiguration("saveResult");
		setDefaultConfiguration("goal");
		executeWhenBuildIsDone(() => {
			executeWhenForSaveResultSet(() => {
				executeWhenForGoalSet(() => {
					vscode.commands.executeCommand('extension.pitest');
				});
			});
		});
		return new Promise((resolve, reject) => executeWhenPitestIsDone(function() {
			const expectedMutationCommand = `mvn org.pitest:pitest-maven:scmMutationCoverage > ${testCommandLineResults.getDir()}`; 
			const actualMutationCommand = mutationCommand();
			
			if (actualMutationCommand !== expectedMutationCommand) {
				reject(getErrorMessageForMutationCommand(expectedMutationCommand, actualMutationCommand));
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
			if (fileContent.includes("[ERROR]")) {
				reject("testCommandLineResults");	
			}

			resolve();
		  }));
	});

	test.skip("Stack Project mutation threshold for Maven", function() {
		buildProgramAndExitTerminal(stackDirectory);
		setDefaultConfiguration("saveResult");
		setDefaultConfiguration("include");
		setDefaultConfiguration("goal");
		executeWhenBuildIsDone(() => {
			executeWhenForSaveResultSet(() => {
				executeWhenForIncludeSet(() => {
					executeWhenForGoalSet(() => {
						vscode.commands.executeCommand('extension.pitest');
					});
				});
			});
		});
		return new Promise((resolve, reject) => executeWhenPitestIsDone(function() {
			const expectedMutationCommand = `mvn org.pitest:pitest-maven:scmMutationCoverage -DmutationThreshold=ADDED,UNKNOWN > ${testCommandLineResults.getDir()}`; 
			const actualMutationCommand = mutationCommand();
			
			if (actualMutationCommand !== expectedMutationCommand) {
				reject(getErrorMessageForMutationCommand(expectedMutationCommand, actualMutationCommand));
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
			if (fileContent.includes("[ERROR]")) {
				reject("testCommandLineResults");	
			}

			resolve();
		  }));
	});
});
