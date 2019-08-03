/* global suite, test, setup, suiteTeardown */

const { getSaveResultsPropertyValue, getTerminalSaveResultsProperty } = require('../../Properties/ResultProperties/SaveResultsProperty');

//vscode module
const vscode = require('vscode');

//Test Module
const { setOutputFileConfiguration, cleanOutputFileConfiguration } = require('../testModules/setProperties');

const { executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

const testProperty = (resolve, reject, haveAOutPut) => {
	const saveResult = vscode.workspace.getConfiguration('saveResult');
	const value = saveResult.get('value');
	const terminalProperty = value ? ` > ${value}` : '';

	if(value !== getSaveResultsPropertyValue()){	
		reject("saveResult");
	}
	if(terminalProperty !== getTerminalSaveResultsProperty()){
		reject("terminalProperty");
	}
	if(haveAOutPut){ 
		if(!value){
			reject("outPutFile not empty");
		}
	}
	resolve();
};

suite("SaveResultsProperty tests", function() {
	setup(function() {
		cleanOutputFileConfiguration();
	});

	suiteTeardown(function() {
		cleanOutputFileConfiguration();
	});

	test("SaveResults by default", function() {
		return new Promise((resolve, reject) => testProperty(resolve, reject));
	}).timeout(defaultTestTimeout);

	test("SaveResults set", function() {
		setOutputFileConfiguration();
		return new Promise((resolve, reject) => 
		executeWhenForSaveResultSet(() => testProperty(resolve, reject, true)));
	}).timeout(defaultTestTimeout);
});