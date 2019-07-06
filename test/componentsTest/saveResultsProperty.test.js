/* global suite, test, setup, teardown */

const { SaveResultsProperty } = require('../../components/SaveResultsProperty');

// The module 'assert' provides assertion methods from node
const assert = require('assert');

//vscode module
const vscode = require('vscode');

//Test Module
const { setOutputFileConfiguration, cleanOutputFileConfiguration } = require('../testModules/testModule');

const { executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

const { defaultTestTimeout } = require('../testModules/timeoutsForTests');	

const testSaveResultsProperty = (resolve, reject, haveAOutPut) => {
	const saveResultsProperty = new SaveResultsProperty();
	const saveResult = vscode.workspace.getConfiguration('saveResult');
	const saveOutpuInFile = saveResult.get('saveInOutPutFile');
	const outPutFile = saveResult.get('outPutFile') ? saveResult.get('outPutFile').dir : saveResult.get('outPutFile'); 
	const terminalProperty = saveOutpuInFile && outPutFile ? `> ${outPutFile}` : '';
	if(saveOutpuInFile !== saveResultsProperty.isSaveOutpuInFile()){
		reject("saveOutpuInFile");
	}
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
	setup("Clean", function() {
		cleanOutputFileConfiguration();
	});

	teardown("Clean", function() {
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