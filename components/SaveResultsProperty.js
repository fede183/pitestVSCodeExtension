//vscode module
const vscode = require('vscode');

class SaveResultsProperty {
    constructor() {
        const saveResult = vscode.workspace.getConfiguration('saveResult');
		const saveOutpuInFile = saveResult.get('saveInOutPutFile');
		const outPutFile = saveResult.get('outPutFile') ? saveResult.get('outPutFile').dir : saveResult.get('outPutFile'); 
        const terminalProperty = saveOutpuInFile && outPutFile ? `> ${outPutFile}` : '';			
        
        this.saveOutpuInFile = saveOutpuInFile;
        this.outPutFile = outPutFile;
        this.terminalProperty = terminalProperty;
    }

    isSaveOutpuInFile(){
        return this.saveOutpuInFile;
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