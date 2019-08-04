const vscode = require('vscode');

const { testCommandLineResults } = require('./testDirModule');

const setConfiguration = function (configName, valueName, value) {
	let config = vscode.workspace.getConfiguration(configName);
	
	let setAsGlobal = config.inspect(valueName).workspaceValue == undefined;
	config.update(valueName, value, setAsGlobal);
}

const cleanOutputFileConfiguration = () => {
	setConfiguration("saveResult", "value", null);
}

const setOutputFileConfiguration = () => {
	setConfiguration("saveResult", "value", testCommandLineResults.getDir());
}

const cleanMavenExecutionConfiguration = () => {
	setConfiguration("mavenExecution", "value", null);
}

const setMavenExecutionConfiguration = () => {
	setConfiguration("mavenExecution", "value", "C:\\Users\\Federico\\opt\\mvn\\bin\\mvn");
}

const cleanWithHistoryConfiguration = () => {
	setConfiguration("withHistory", "value", false);
}

const setWithHistoryConfiguration = () => {
	setConfiguration("withHistory", "value", true);
}

const cleanMutationThresholdConfiguration = () => {
	setConfiguration("mutationThreshold", "value", null);
}

const setMutationThresholdConfiguration = () => {
	setConfiguration("mutationThreshold", "value", 85);
}

module.exports = {
    cleanOutputFileConfiguration,
    setOutputFileConfiguration,
    cleanMavenExecutionConfiguration,
	setMavenExecutionConfiguration,
	cleanWithHistoryConfiguration,
	setWithHistoryConfiguration,
	cleanMutationThresholdConfiguration,
	setMutationThresholdConfiguration,
}