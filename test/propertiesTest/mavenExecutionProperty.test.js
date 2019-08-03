/* global suite, test, setup, suiteTeardown */

//vscode module
const vscode = require('vscode');

//Test Module
const { setMavenExecutionConfiguration, cleanMavenExecutionConfiguration } = require('../testModules/setProperties');

const { executeWhenForMavenExecutionSet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

const { getMavenExecutionPropertyValue, getTerminalMavenExecutionProperty } = require('../../Properties/ExecutionProperties/MavenExecutionProperty');

const testProperty = (resolve, reject) => {
	const mavenExecution = vscode.workspace.getConfiguration('mavenExecution');
	const customDirectory = mavenExecution.get('value');
	const terminalProperty = (customDirectory ? customDirectory + ".cmd" : "mvn") + " ";
	
	if(customDirectory !== getMavenExecutionPropertyValue()){
		reject("value");
	}
	if(terminalProperty !== getTerminalMavenExecutionProperty()){
		reject("terminalProperty");
	}
	resolve();
};

suite("MavenExecutionProperty tests", function() {
	setup(function() {
		cleanMavenExecutionConfiguration();
	});

	suiteTeardown(function() {
		cleanMavenExecutionConfiguration();
	});

	test("MavenExecution by default", function() {
		return new Promise((resolve, reject) => testProperty(resolve, reject));
	}).timeout(defaultTestTimeout);

	test("MavenExecution set", function() {
		setMavenExecutionConfiguration();
		return new Promise((resolve, reject) => 
		executeWhenForMavenExecutionSet(() => testProperty(resolve, reject)));
	}).timeout(defaultTestTimeout);
});