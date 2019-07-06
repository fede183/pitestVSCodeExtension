/* global suite, test, setup, teardown */

const { SaveResultsProperty } = require('../../components/SaveResultsProperty');
const { getAllProperties } = require('../../components/ResultsProperties');

//Test Module
const { setOutputFileConfiguration, cleanOutputFileConfiguration } = require('../testModules/testModule');

const { executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

const testSaveResultsProperty = (resolve, reject) => {
	const saveResultsProperty = new SaveResultsProperty();

	if(getAllProperties() !== " " + saveResultsProperty.getTerminalProperty()){
		reject();
	}

	resolve();
}

suite("ResultsProperty tests", function() {
	setup("Clean", function() {
		cleanOutputFileConfiguration();
	});

	teardown("Clean", function() {
		cleanOutputFileConfiguration();
	});

	test("SaveResults by default", () => {
		return new Promise((resolve, reject) => testSaveResultsProperty(resolve, reject));
	}).timeout(defaultTestTimeout);

	test("SaveResults set", function() {
		setOutputFileConfiguration();
		return new Promise((resolve, reject) => executeWhenForSaveResultSet(() => testSaveResultsProperty(resolve, reject)));
	}).timeout(defaultTestTimeout);
});