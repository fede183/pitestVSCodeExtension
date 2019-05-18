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
		const saveResult = vscode.workspace.getConfiguration('saveResult');
		const saveOutpuInFile = saveResult.get('saveInOutPutFile');
		const outPutFile = saveResult.get('outPutFile'); 
		const mutationCommand = 'mvn org.pitest:pitest-maven:mutationCoverage' + 
		(saveOutpuInFile && outPutFile ? 
		` > ${outPutFile}` : '');

		terminal.sendText(mutationCommand);
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
