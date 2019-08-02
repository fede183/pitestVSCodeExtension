const vscode = require('vscode');

const { testCommandLineResults } = require('./testDirModule');

const cleanConfiguration = (configName, valueName, value) => {
	let config = vscode.workspace.getConfiguration(configName);
	
	let setAsGlobal = config.inspect(valueName).workspaceValue == undefined;
	config.update(valueName, value, setAsGlobal);
}

const cleanOutputFileConfiguration = () => {
	cleanConfiguration("saveResult", "value", null);
}

const setOutputFileConfiguration = () => {
	cleanConfiguration("saveResult", "value", testCommandLineResults);
}

const cleanMavenExecutionConfiguration = () => {
	cleanConfiguration("mavenExecution", "value", null);
}

const setMavenExecutionConfiguration = () => {
	cleanConfiguration("mavenExecution", "value", "C:\\Users\\Federico\\opt\\mvn\\bin\\mvn");
}

const cleanWithHistoryConfiguration = () => {
	cleanConfiguration("withHistory", "value", false);
}

const setWithHistoryConfiguration = () => {
	cleanConfiguration("withHistory", "value", true);
}

module.exports = {
    cleanOutputFileConfiguration,
    setOutputFileConfiguration,
    cleanMavenExecutionConfiguration,
	setMavenExecutionConfiguration,
	cleanWithHistoryConfiguration,
	setWithHistoryConfiguration,
}