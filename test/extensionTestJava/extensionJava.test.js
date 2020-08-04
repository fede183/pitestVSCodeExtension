/* global suite, test, setup, suiteTeardown */

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

//FileSystem
const fs = require("fs");

//Test Module
const { stackDirectory,
	targetDirectory, } = require('../testModules/testDirModule');

const { buildProgramAndExitTerminal, cleanProgram, } = require('../testModules/testModule');
		
const {	setExecutionModeConfiguration} = require('../testModules/setProperties');

const { executeWhenBuildIsDone,
	executeWhenPitestIsDone,
	executeWhenForExecutionModeCommandLineSet, } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');

const { mutationCommand } = require('../../terminalCommand');

const getErrorMessageForMutationCommand = (expected, actual) => "Expected mutation command: " + expected + 
" vs actual mutation command" + actual 

suite("Stack Pitest Execution Extension Tests", function() {
	setup(function() {
		cleanProgram();
	});

	suiteTeardown(function() {
		cleanProgram();
	});

	test("Stack Project pitest directories exists", function() {
		setExecutionModeConfiguration()
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
});
