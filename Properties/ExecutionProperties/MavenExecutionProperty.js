//vscode module
const vscode = require('vscode');

class MavenExecutionProperty {
    constructor() {
        const mavenExecution = vscode.workspace.getConfiguration('mavenExecution');
        const customDirectory = mavenExecution.get('customDirectory');
        const terminalProperty = customDirectory ? customDirectory + ".cmd" : "mvn";			
        
        this.customDirectory = customDirectory;
        this.terminalProperty = terminalProperty;
    }

    getCustomDirectory(){
        return this.customDirectory;
    }

    getTerminalProperty(){
        return this.terminalProperty;
    }
}

module.exports = {
    MavenExecutionProperty,
}