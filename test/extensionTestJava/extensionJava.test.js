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
		
const {	setExecutionModeConfiguration, 
	setOutputFileConfiguration,
	setWithHistoryConfiguration,
	setMutationThresholdConfiguration, } = require('../testModules/setProperties');

const { executeWhenBuildIsDone,
	executeWhenPitestIsDone,
	executeWhenForExecutionModeCommandLineSet,
	executeWhenForSaveResultSet, 
	executeWhenTestCommandLineResultFileIsAvailable, 
	executeWhenForWithHistorySet, 
	executeWhenForMutationThresholdSet, } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');

const { mutationCommand } = require('../../terminalCommand');

const getErrorMessageForMutationCommand = (expected, actual) => "Expected mutation command: " + expected + 
" vs actual mutation command: " + actual 

suite("Stack Pitest Execution Extension Tests for Java", function() {
	setup(function() {
		cleanProgram();
		setExecutionModeConfiguration();
	});

	suiteTeardown(function() {
		cleanProgram();
	});

	test("Stack Project pitest directories exists for Java", function() {
		executeWhenForExecutionModeCommandLineSet(() => 
			buildProgramAndExitTerminal(stackDirectory));
		executeWhenBuildIsDone(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenPitestIsDone(function() {
			const expectedMutationCommand = 'java -classpath "target/classes:target/test-classes:../../PiTEST/pitest-1.4.10.jar:../../PiTEST/pitest-command-line-1.4.10.jar:../../PiTEST/pitest-entry-1.4.10.jar:../../PiTEST/junit-4.11.jar" org.pitest.mutationtest.commandline.MutationCoverageReport --reportDir target/pit-reports --targetClasses org.autotest.StackAr --targetTests org.autotest.TestStackAr --sourceDirs src/main/,src/test/'; 
			const actualMutationCommand = mutationCommand();
			
			if (actualMutationCommand !== expectedMutationCommand) {
				reject(getErrorMessageForMutationCommand(expectedMutationCommand, actualMutationCommand));
			}

			if (!fs.existsSync(targetDirectory.addDir("pit-reports"))) {
				reject();	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest with pom file (with output file configuration) for Java", function() {
		executeWhenForExecutionModeCommandLineSet(() => buildProgramAndExitTerminal(stackDirectory));
		executeWhenBuildIsDone(() => setOutputFileConfiguration());
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenPitestIsDone(
			function() {
				const expectedMutationCommand = `java -classpath \"target/classes:target/test-classes:../../PiTEST/pitest-1.4.10.jar:../../PiTEST/pitest-command-line-1.4.10.jar:../../PiTEST/pitest-entry-1.4.10.jar:../../PiTEST/junit-4.11.jar\" org.pitest.mutationtest.commandline.MutationCoverageReport --reportDir target/pit-reports --targetClasses org.autotest.StackAr --targetTests org.autotest.TestStackAr --sourceDirs src/main/,src/test/ > ${testCommandLineResults.getDir()}`; 
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

	test("Stack Project pitest in file without pom file (with output file configuration) for Java", function() {
		executeWhenForExecutionModeCommandLineSet(() => { 
			buildProgramAndExitTerminal(emptyDirectory);
			setOutputFileConfiguration();
		});
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenTestCommandLineResultFileIsAvailable(function() {
			const expectedMutationCommand = `java -classpath \"target/classes:target/test-classes:../../PiTEST/pitest-1.4.10.jar:../../PiTEST/pitest-command-line-1.4.10.jar:../../PiTEST/pitest-entry-1.4.10.jar:../../PiTEST/junit-4.11.jar\" org.pitest.mutationtest.commandline.MutationCoverageReport --reportDir target/pit-reports --targetClasses org.autotest.StackAr --targetTests org.autotest.TestStackAr --sourceDirs src/main/,src/test/ > ${testCommandLineResults.getDir()}`; 
			const actualMutationCommand = mutationCommand();
			
			if (actualMutationCommand !== expectedMutationCommand) {
				reject(getErrorMessageForMutationCommand(expectedMutationCommand, actualMutationCommand));
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
			if (fileContent !== "") {
				reject("testCommandLineResults");	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	test("Stack Project pitest without an open terminal (with output file configuration) for Java", function() {
		executeWhenForExecutionModeCommandLineSet(() => setOutputFileConfiguration());
		executeWhenForSaveResultSet(() => vscode.commands.executeCommand('extension.pitest'));
		return new Promise((resolve, reject) => executeWhenTestCommandLineResultFileIsAvailable(function() {
			const expectedMutationCommand = `java -classpath \"target/classes:target/test-classes:../../PiTEST/pitest-1.4.10.jar:../../PiTEST/pitest-command-line-1.4.10.jar:../../PiTEST/pitest-entry-1.4.10.jar:../../PiTEST/junit-4.11.jar\" org.pitest.mutationtest.commandline.MutationCoverageReport --reportDir target/pit-reports --targetClasses org.autotest.StackAr --targetTests org.autotest.TestStackAr --sourceDirs src/main/,src/test/ > ${testCommandLineResults.getDir()}`; 
			const actualMutationCommand = mutationCommand();
			
			if (actualMutationCommand !== expectedMutationCommand) {
				reject(getErrorMessageForMutationCommand(expectedMutationCommand, actualMutationCommand));
			}

			const fileContent = fs.readFileSync(testCommandLineResults.getDir(), readMode);
			if (fileContent !== "") {
				reject();	
			}

			resolve();
		  }));
	}).timeout(defaultTestTimeout);

	const propertyTest = (set, execute, command) => {
		executeWhenForExecutionModeCommandLineSet(() => {
	 		buildProgramAndExitTerminal(stackDirectory);
	 		executeWhenBuildIsDone(() => {
				setOutputFileConfiguration();
				executeWhenForSaveResultSet(() => {
					set();
					execute(() =>
						vscode.commands.executeCommand('extension.pitest')
					);
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

	test("Stack Project mutation threshold for Java", () => propertyTest(setMutationThresholdConfiguration, executeWhenForMutationThresholdSet,
		`java -classpath \"target/classes:target/test-classes:../../PiTEST/pitest-1.4.10.jar:../../PiTEST/pitest-command-line-1.4.10.jar:../../PiTEST/pitest-entry-1.4.10.jar:../../PiTEST/junit-4.11.jar\" org.pitest.mutationtest.commandline.MutationCoverageReport --reportDir target/pit-reports --targetClasses org.autotest.StackAr --targetTests org.autotest.TestStackAr --sourceDirs src/main/,src/test/ --mutationThreshold=${85} > ${testCommandLineResults.getDir()}`)
	).timeout(defaultTestTimeout);

});
