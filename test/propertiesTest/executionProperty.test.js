/* global suite, test, setup, suiteTeardown */

const { MavenExecutionProperty } = require('../../Properties/ExecutionProperties/MavenExecutionProperty');
const { getAllProperties } = require('../../Properties/ExecutionProperties/ExecutionProperties');

//Test Module
const { setMavenExecutionConfiguration, cleanMavenExecutionConfiguration } = require('../testModules/setProperties');

const { executeWhenForMavenExecutionSet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

const testMavenExecutionProperty = (resolve, reject) => {
	const mavenExecutionProperty = new MavenExecutionProperty();

	if(getAllProperties() !== " " + mavenExecutionProperty.getTerminalProperty()){
		reject();
	}

	resolve();
};

suite("ExecutionProperty tests", function() {
	setup(function() {
		cleanMavenExecutionConfiguration();
	});

	suiteTeardown(function() {
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