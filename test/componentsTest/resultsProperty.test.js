/* global suite, test */


const { SaveResultsProperty } = require('../../components/SaveResultsProperty');
const { getAllProperties } = require('../../components/ResultsProperties');

// The module 'assert' provides assertion methods from node
const assert = require('assert');

//Test Module
const { setOutputFileConfiguration } = require('../testModules/testModule');

const { executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

suite("ResultsProperty tests", function() {
	test("SaveResults by default", function() {
		const saveResultsProperty = new SaveResultsProperty();

		assert.equal(getAllProperties(), " " + saveResultsProperty.getTerminalProperty());
	});

	test("SaveResults set", function() {
		setOutputFileConfiguration();
		executeWhenForSaveResultSet(() => {
			const saveResultsProperty = new SaveResultsProperty();
	
			assert.equal(getAllProperties(), " " + saveResultsProperty.getTerminalProperty());
		});
	});
});