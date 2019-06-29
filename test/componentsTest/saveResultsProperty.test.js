/* global suite, test */

const { SaveResultsProperty } = require('../../components/SaveResultsProperty');

// The module 'assert' provides assertion methods from node
const assert = require('assert');

//vscode module
const vscode = require('vscode');

//Test Module
const { setOutputFileConfiguration } = require('../testModules/testModule');

const { executeWhenConditionIsReach, conditionForSaveResultSet} = require('../testModules/executeWhenModule');

suite("SaveResultsProperty tests", function() {
	test("SaveResults by default", function() {
		const saveResultsProperty = new SaveResultsProperty();
		const saveResult = vscode.workspace.getConfiguration('saveResult');
		const saveOutpuInFile = saveResult.get('saveInOutPutFile');
		const outPutFile = saveResult.get('outPutFile') ? saveResult.get('outPutFile').dir : saveResult.get('outPutFile'); 
		const terminalProperty = saveOutpuInFile && outPutFile ? ` > ${outPutFile}` : '';
		assert.equal(saveOutpuInFile, saveResultsProperty.isSaveOutpuInFile());
		assert.equal(outPutFile, saveResultsProperty.getSaveOutpuInFile());
		assert.equal(terminalProperty, saveResultsProperty.getTerminalProperty());
	});

	test("SaveResults set", function() {
		setOutputFileConfiguration();
		executeWhenConditionIsReach(conditionForSaveResultSet, () => {
			const saveResultsProperty = new SaveResultsProperty();
			const saveResult = vscode.workspace.getConfiguration('saveResult');
			const saveOutpuInFile = saveResult.get('saveInOutPutFile');
			const outPutFile = saveResult.get('outPutFile') ? saveResult.get('outPutFile').dir : saveResult.get('outPutFile'); 
			const terminalProperty = saveOutpuInFile && outPutFile ? ` > ${outPutFile}` : '';
			assert.equal(saveOutpuInFile, saveResultsProperty.isSaveOutpuInFile());
			assert.equal(outPutFile, saveResultsProperty.getSaveOutpuInFile());
			assert.equal(terminalProperty, saveResultsProperty.getTerminalProperty());
		});
	});
});