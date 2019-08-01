const vscode = require('vscode');

const { testCommandLineResults } = require('./testDirModule');

const cleanOutputFileConfiguration = () => {
	let config = vscode.workspace.getConfiguration("saveResult");

	let outPutFile = "outPutFile";
	let setAsGlobal = config.inspect(outPutFile).workspaceValue == undefined;
	config.update(outPutFile, null, setAsGlobal);
}

const setOutputFileConfiguration = () => {
	let config = vscode.workspace.getConfiguration("saveResult");

	let outPutFile = "outPutFile";
	let setAsGlobal = config.inspect(outPutFile).workspaceValue == undefined;
	config.update(outPutFile, testCommandLineResults, setAsGlobal);
}

const cleanMavenExecutionConfiguration = () => {
	let config = vscode.workspace.getConfiguration("mavenExecution");

	let customDirectory = "customDirectory";
	let setAsGlobal = config.inspect(customDirectory).workspaceValue == undefined;
	config.update(customDirectory, null, setAsGlobal);
}

const setMavenExecutionConfiguration = () => {
    let config = vscode.workspace.getConfiguration("mavenExecution");

	let customDirectoryProperty = "customDirectory";
	let setAsGlobal = config.inspect(customDirectoryProperty).workspaceValue == undefined;
	config.update(customDirectoryProperty, "C:\\Users\\Federico\\opt\\mvn\\bin\\mvn", setAsGlobal);
}

const cleanWithHistoryConfiguration = () => {
	let config = vscode.workspace.getConfiguration("withHistory");

	let value = "value";
	let setAsGlobal = config.inspect(value).workspaceValue == undefined;
	config.update(value, false, setAsGlobal);
}

const setWithHistoryConfiguration = () => {
    let config = vscode.workspace.getConfiguration("withHistory");

	let value = "value";
	let setAsGlobal = config.inspect(value).workspaceValue == undefined;
	config.update(value, true, setAsGlobal);
}

module.exports = {
    cleanOutputFileConfiguration,
    setOutputFileConfiguration,
    cleanMavenExecutionConfiguration,
	setMavenExecutionConfiguration,
	cleanWithHistoryConfiguration,
	setWithHistoryConfiguration,
}