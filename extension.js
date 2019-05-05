// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "pitest" is now active!');

	const pitest = vscode.commands.registerCommand('extension.pitest', function () {
		let terminal = vscode.window.activeTerminal;
		if (!terminal) {
			terminal = vscode.window.createTerminal();	
		}
		terminal.show();
		const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.path;
		terminal.sendText('cd ' + workspaceFolder);
		terminal.sendText('mvn org.pitest:pitest-maven:mutationCoverage');
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
