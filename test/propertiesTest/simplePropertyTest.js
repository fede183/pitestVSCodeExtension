/* global suite, test, setup, suiteTeardown */

const vscode = require('vscode');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

const getSimplePropertyTest = (name, configName, clean, set, getValue, getTerminalToTest, getTerminal, executeWhen, executeWhenDefault = (program) => program() ) => {

	const testProperty = (resolve, reject) => {
		const config = vscode.workspace.getConfiguration(configName);
		const value = config.get('value');
		const terminalProperty = getTerminal(value);
		
		if (value !== getValue()) {
			reject("value");
		}
		if (terminalProperty !== getTerminalToTest()) {
			reject("terminalProperty");
		}
		resolve();
	};

	return suite(`${name} tests`, function() {
		setup(function() {
			clean();
		});

		suiteTeardown(function() {
			clean();
		});

		test(`${name} by default`, function() {
			return new Promise((resolve, reject) => 
			executeWhenDefault(() => testProperty(resolve, reject)));
		}).timeout(defaultTestTimeout);

		test(`${name} set`, function() {
			set();
			return new Promise((resolve, reject) => 
			executeWhen(() => testProperty(resolve, reject)));
		}).timeout(defaultTestTimeout);
	});
}

module.exports = {
    getSimplePropertyTest,
}
