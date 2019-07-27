/* global suite, test, setup, suiteTeardown */

const { MavenExecutionProperty } = require('../../Properties/ExecutionProperties/MavenExecutionProperty');

//vscode module
const vscode = require('vscode');

//Test Module
const { setMavenExecutionConfiguration, cleanMavenExecutionConfiguration } = require('../testModules/setProperties');

const { executeWhenForMavenExecutionSet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

const testMavenExecutionProperty = (resolve, reject) => {
	const mavenExecutionProperty = new MavenExecutionProperty();
	const mavenExecution = vscode.workspace.getConfiguration('mavenExecution');
	const customDirectory = mavenExecution.get('customDirectory');
	const terminalProperty = customDirectory ? customDirectory : "mvn";
	
	if(customDirectory !== mavenExecutionProperty.getCustomDirectory()){
		reject("customDirectory");
	}
	if(terminalProperty !== mavenExecutionProperty.getTerminalProperty()){
		reject("terminalProperty");
	}
	resolve();
};

suite("ExecutionProperty tests", function() {
	setup("Clean", function() {
		cleanMavenExecutionConfiguration();
	});

	suiteTeardown("Clean", function() {
		cleanMavenExecutionConfiguration();
	});

	test("MavenExecution by default", function() {
		return new Promise((resolve, reject) => testMavenExecutionProperty(resolve, reject));
	}).timeout(defaultTestTimeout);

	test("MavenExecution set", function() {
		setMavenExecutionConfiguration();
		return new Promise((resolve, reject) => 
		executeWhenForMavenExecutionSet(() => testMavenExecutionProperty(resolve, reject)));
	}).timeout(defaultTestTimeout);
});