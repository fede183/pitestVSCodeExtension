//vscode module
const vscode = require('vscode');

class WithHistoryProperty {
    constructor() {
        const withHistory = vscode.workspace.getConfiguration('withHistory');
		const value = withHistory.get('value');
        const terminalProperty = value ? '-DwithHistory' : '';			
        
        this.withHistory = value;
        this.terminalProperty = terminalProperty;
    }

    getWithHistory(){
        return this.withHistory;
    }

    getTerminalProperty(){
        return this.terminalProperty;
    }
}

module.exports = {
    WithHistoryProperty,
}