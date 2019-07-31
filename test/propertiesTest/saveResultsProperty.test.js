/* global suite, test, setup, suiteTeardown */

const { SaveResultsProperty } = require('../../Properties/ResultProperties/SaveResultsProperty');

//vscode module
const vscode = require('vscode');

//Test Module
const { setOutputFileConfiguration, cleanOutputFileConfiguration } = require('../testModules/setProperties');

const { executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

/**
 * @param {{ (value?: any): void; (value?: any): void; (): void; }} resolve
 * @param {{ (reason?: any): void; (reason?: any): void; (arg0: string): void; (arg0: string): void; (arg0: string): void; (arg0: string): void; }} reject
 * @param {boolean} [haveAOutPut]
 */
const testSaveResultsProperty = (resolve, reject, haveAOutPut) => {
	const saveResultsProperty = new SaveResultsProperty();
	const saveResult = vscode.workspace.getConfiguration('saveResult');
	const outPutFile = saveResult.get('outPutFile') ? saveResult.get('outPutFile').dir : saveResult.get('outPutFile'); 
	const terminalProperty = outPutFile ? `> ${outPutFile}` : '';
	
	if(outPutFile !== saveResultsProperty.getSaveOutpuInFile()){	
		reject("outPutFile");
	}
	if(terminalProperty !== saveResultsProperty.getTerminalProperty()){
		reject("terminalProperty");
	}
	if(haveAOutPut){ 
		if(!outPutFile){
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
		return new Promise((resolve, reject) => testSaveResultsProperty(resolve, reject));
	}).timeout(defaultTestTimeout);

	test("SaveResults set", function() {
		setOutputFileConfiguration();
		return new Promise((resolve, reject) => 
		executeWhenForSaveResultSet(() => testSaveResultsProperty(resolve, reject, true)));
	}).timeout(defaultTestTimeout);
});