/* global suite, test, setup, suiteTeardown */

const { WithHistoryProperty } = require('../../Properties/PostProperties/WithHistoryProperty');

//vscode module
const vscode = require('vscode');

//Test Module
const { cleanWithHistoryConfiguration, setWithHistoryConfiguration } = require('../testModules/setProperties');

const { executeWhenForWithHistorySet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

/**
 * @param {{ (value?: any): void; (value?: any): void; (): void; }} resolve
 * @param {{ (reason?: any): void; (reason?: any): void; (arg0: string): void; (arg0: string): void; (arg0: string): void; (arg0: string): void; }} reject
 */
const testProperty = (resolve, reject) => {
	const withHistoryProperty = new WithHistoryProperty();
	const withHistory = vscode.workspace.getConfiguration('withHistory');
	const value = withHistory.get('value');
	const terminalProperty = value ? '-DwithHistory' : '';
	
	if(value !== withHistoryProperty.getWithHistory()){	
		reject("outPutFile");
	}
	if(terminalProperty !== withHistoryProperty.getTerminalProperty()){
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