//vscode module
const vscode = require('vscode');

class SaveResultsProperty {
    constructor() {
        const saveResult = vscode.workspace.getConfiguration('saveResult');
		const outPutFile = saveResult.get('outPutFile') ? saveResult.get('outPutFile').dir : saveResult.get('outPutFile'); 
        const terminalProperty = outPutFile ? `> ${outPutFile}` : '';			
        
        this.outPutFile = outPutFile;
        this.terminalProperty = terminalProperty;
    }

    getSaveOutpuInFile(){
        return this.outPutFile;
    }

    getTerminalProperty(){
        return this.terminalProperty;
    }
}

module.exports = {
    SaveResultsProperty,
}