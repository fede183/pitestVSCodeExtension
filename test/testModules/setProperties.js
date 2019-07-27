// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');

//Directories
const { testCommandLineResults } = require('./testDirModule');

//Clean output file configuration
const cleanOutputFileConfiguration = () => {
	let config = vscode.workspace.getConfiguration("saveResult");

	let saveInOutPutFile = "saveInOutPutFile";
	let setAsGlobal = config.inspect(saveInOutPutFile).workspaceValue == undefined;
	config.update(saveInOutPutFile, false, setAsGlobal);

	let outPutFile = "outPutFile";
	setAsGlobal = config.inspect(outPutFile).workspaceValue == undefined;
	config.update(outPutFile, null, setAsGlobal);
}

//Set output file configuration
const setOutputFileConfiguration = () => {
	let config = vscode.workspace.getConfiguration("saveResult");

	let saveInOutPutFile = "saveInOutPutFile";
	let setAsGlobal = config.inspect(saveInOutPutFile).workspaceValue == undefined;
	config.update(saveInOutPutFile, true, setAsGlobal);

	let outPutFile = "outPutFile";
	setAsGlobal = config.inspect(outPutFile).workspaceValue == undefined;
	config.update(outPutFile, testCommandLineResults, setAsGlobal);
}

//Clean maven execution file configuration
const cleanMavenExecutionConfiguration = () => {
	let config = vscode.workspace.getConfiguration("mavenExecution");

	let customDirectory = "customDirectory";
	let setAsGlobal = config.inspect(customDirectory).workspaceValue == undefined;
	config.update(customDirectory, null, setAsGlobal);
}

//Set maven execution configuration
const setMavenExecutionConfiguration = () => {
    let config = vscode.workspace.getConfiguration("mavenExecution");

	let customDirectoryProperty = "customDirectory";
	let setAsGlobal = config.inspect(customDirectoryProperty).workspaceValue == undefined;
	config.update(customDirectoryProperty, "C:\Users\Federico\opt\mvn\bin", setAsGlobal);
}

module.exports = {
    cleanOutputFileConfiguration,
    setOutputFileConfiguration,
    cleanMavenExecutionConfiguration,
    setMavenExecutionConfiguration,
}