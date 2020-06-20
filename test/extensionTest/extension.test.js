/* global suite, test, setup, suiteTeardown */

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

//FileSystem
const fs = require("fs");

//Test Module
const { stackDirectory,
	emptyDirectory,
  	targetDirectory,
	testCommandLineResults,
	readMode, } = require('../testModules/testDirModule');

const { buildProgramAndExitTerminal, cleanProgram, } = require('../testModules/testModule');
		
const {	setOutputFileConfiguration, 
	setMavenExecutionConfiguration, 
	setWithHistoryConfiguration,
	setMutationThresholdConfiguration,
	setIncludeConfiguration,
	setGoalConfiguration, } = require('../testModules/setProperties');

const { executeWhenBuildIsDone,
	executeWhenPitestIsDone,
	executeWhenForSaveResultSet,
	executeWhenTestCommandLineResultFileIsAvailable,
	executeWhenForMavenExecutionSet,
	executeWhenForWithHistorySet,
	executeWhenForMutationThresholdSet,
	executeWhenForIncludeSet,
	executeWhenForGoalSet,
	executeWhenTerminalIsOutOfUse, } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');

const { mutationCommand } = require('../../terminalCommand');


suite("Stack Pitest Execution Extension Tests", function() {
	setup(function() {
		cleanProgram();
	});

	suiteTeardown(function() {
		cleanProgram();
	});

	test("Stack Project pitest directories exists", function() {
		buildProgramAndExitTerminal(stackDirectory);
		executeWhenBuildIsDone(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenPitestIsDone(function() {

			if (mutationCommand() !== "mvn org.pitest:pitest-maven:mutationCoverage") {
				reject();
			}

			if (!fs.existsSync(targetDirectory.addDir("pit-reports"))) {
				reject();	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest with pom file(with output file configuration)", function() {
		buildProgramAndExitTerminal(stackDirectory);
		executeWhenBuildIsDone(() => setOutputFileConfiguration());
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenPitestIsDone(
			function() {

				if (mutationCommand() !== `mvn org.pitest:pitest-maven:mutationCoverage > ${testCommandLineResults.getDir()}`) {
					reject();
				}

				const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
				if (fileContent.includes("[ERROR]")) {
					reject("testCommandLineResults");	
				}

				resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest in file without pom file(with output file configuration)", function() {
		buildProgramAndExitTerminal(emptyDirectory);
		setOutputFileConfiguration();
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenTestCommandLineResultFileIsAvailable(function() {

			if (mutationCommand() !== `mvn org.pitest:pitest-maven:mutationCoverage > ${testCommandLineResults.getDir()}`) {
				reject();
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
			if (!fileContent.includes("[ERROR]")) {
				reject("testCommandLineResults");	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest without an open terminal(with output file configuration)", function() {
		setOutputFileConfiguration();
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenTestCommandLineResultFileIsAvailable(function() {

			if (mutationCommand() !== `mvn org.pitest:pitest-maven:mutationCoverage > ${testCommandLineResults.getDir()}`) {
				reject();
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
		setOutputFileConfiguration();
		set();
		executeWhenBuildIsDone(() => {
			executeWhenForSaveResultSet(() => {
				execute(() => {
					vscode.commands.executeCommand('extension.pitest');
				});
			});
		});
		return new Promise((resolve, reject) => executeWhenPitestIsDone(function() {

			if (mutationCommand() !== command) {
				reject();
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

	test("Stack Project with history", () => propertyTest(setWithHistoryConfiguration, executeWhenForWithHistorySet,
		`mvn org.pitest:pitest-maven:mutationCoverage -DwithHistory > ${testCommandLineResults.getDir()}`)
	).timeout(defaultTestTimeout);
	
	test("Stack Project mutation threshold", () => propertyTest(setMutationThresholdConfiguration, executeWhenForMutationThresholdSet,
		`mvn org.pitest:pitest-maven:mutationCoverage -DmutationThreshold=${85} > ${testCommandLineResults.getDir()}`)
	).timeout(defaultTestTimeout);

	test.skip("Stack Project goal", function() {
		buildProgramAndExitTerminal(stackDirectory);
		setOutputFileConfiguration();
		setGoalConfiguration();
		executeWhenBuildIsDone(() => {
			executeWhenForSaveResultSet(() => {
				executeWhenForGoalSet(() => {
					vscode.commands.executeCommand('extension.pitest');
				});
			});
		});
		return new Promise((resolve, reject) => executeWhenPitestIsDone(function() {

			if (mutationCommand() !== `mvn org.pitest:pitest-maven:scmMutationCoverage > ${testCommandLineResults.getDir()}`) {
				reject();
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
			if (fileContent.includes("[ERROR]")) {
				reject("testCommandLineResults");	
			}

			resolve();
		  }));
	});

	test.skip("Stack Project mutation threshold", function() {
		buildProgramAndExitTerminal(stackDirectory);
		setOutputFileConfiguration();
		setIncludeConfiguration();
		setGoalConfiguration();
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

			if (mutationCommand() !== `mvn org.pitest:pitest-maven:scmMutationCoverage -DmutationThreshold=ADDED,UNKNOWN > ${testCommandLineResults.getDir()}`) {
				reject();
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
			if (fileContent.includes("[ERROR]")) {
				reject("testCommandLineResults");	
			}

			resolve();
		  }));
	});
});
