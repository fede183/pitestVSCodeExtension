/* global suite, test, setup, suiteTeardown */

const { getWithHistoryPropertyValue, getTerminalWithHistoryProperty } = require('../../Properties/PostProperties/WithHistoryProperty');

//vscode module
const vscode = require('vscode');

//Test Module
const { cleanWithHistoryConfiguration, setWithHistoryConfiguration } = require('../testModules/setProperties');

const { executeWhenForWithHistorySet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

const testProperty = (resolve, reject) => {
	const withHistory = vscode.workspace.getConfiguration('withHistory');
	const value = withHistory.get('value');
	const terminalProperty = value ? '-DwithHistory' : '';
	
	if(value !== getWithHistoryPropertyValue()){	
		reject("withHistory");
	}
	if(terminalProperty !== getTerminalWithHistoryProperty()){
		reject("terminalProperty");
	}
	resolve();
};

suite("WithHistoryProperty tests", function() {
	setup(function() {
		cleanWithHistoryConfiguration();
	});

	suiteTeardown(function() {
		cleanWithHistoryConfiguration();
	});

	test("WithHistory by default", function() {
		return new Promise((resolve, reject) => testProperty(resolve, reject));
	}).timeout(defaultTestTimeout);

	test("WithHistory set", function() {
		setWithHistoryConfiguration();
		return new Promise((resolve, reject) => 
		executeWhenForWithHistorySet(() => testProperty(resolve, reject)));
	}).timeout(defaultTestTimeout);
});