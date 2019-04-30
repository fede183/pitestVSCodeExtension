// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "pitest" is now active!');

	let disposable = vscode.commands.registerCommand('extension.buildProgram', function () {
		const stackDirectory = __dirname + "/test/Stack"
		const terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText('cd ' + stackDirectory);
		terminal.sendText('mvn clean install');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
