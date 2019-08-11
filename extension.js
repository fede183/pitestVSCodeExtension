// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const { mutationCommand } = require('./terminalCommand');

const { showLinkResults } = require('./resultsManager');

const { executeWhenConditionIsReach } = require('./executeWhenConditionIsReach');

const { getShowWebResultsPropertyValue } = require('./Properties/PostExecutionProperties/ShowWebResultsProperty');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "pitest" is now active!');

	const pitest = vscode.commands.registerCommand('extension.pitest', function () {
		const terminal = vscode.window.activeTerminal ? vscode.window.activeTerminal : vscode.window.createTerminal();
		terminal.show();
		
		const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.path.startsWith("/c:") ? 
		vscode.workspace.workspaceFolders[0].uri.path.substring(1) : 
		vscode.workspace.workspaceFolders[0].uri.path;

		terminal.sendText('cd ' + workspaceFolder);

		const terminalFinish = " ; exit"; 

		terminal.sendText(mutationCommand() + terminalFinish);
		if(getShowWebResultsPropertyValue()) {
			executeWhenConditionIsReach(() => !vscode.window.terminals.includes(terminal), 
			() => showLinkResults(workspaceFolder));
		}
	});

	context.subscriptions.push(pitest);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
