/* global suite, test, setup, suiteTeardown */

const { SaveResultsProperty } = require('../../Properties/ResultProperties/SaveResultsProperty');
const { getAllProperties } = require('../../Properties/ResultProperties/ResultsProperties');

//Test Module
const { setOutputFileConfiguration, cleanOutputFileConfiguration } = require('../testModules/setProperties');

const { executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

/**
 * @param {{ (value?: any): void; (value?: any): void; (): void; }} resolve
 * @param {{ (reason?: any): void; (reason?: any): void; (): void; }} reject
 */
const testSaveResultsProperty = (resolve, reject) => {
	const saveResultsProperty = new SaveResultsProperty();

	if(getAllProperties() !== " " + saveResultsProperty.getTerminalProperty()){
		reject();
	}

	resolve();
}

suite("ResultsProperty tests", function() {
	setup(function() {
		cleanOutputFileConfiguration();
	});

	suiteTeardown(function() {
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