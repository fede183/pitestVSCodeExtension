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

const cleanExecutionModeConfiguration = () => {
	setConfiguration("executionMode", "value", null);
}

const setExecutionModeConfiguration = (value) => {
	setConfiguration("executionMode", "value", value);
}

const cleanMavenExecutionConfiguration = () => {
	setConfiguration("mavenExecution", "value", null);
}

const setMavenExecutionConfiguration = () => {
	setConfiguration("mavenExecution", "value", "E:\\Documents\\Utilities\\Windows\\Coding\\opt\\apache-maven-3.6.3\\bin\\mvn");
}

const cleanCommandLineExecutionConfiguration = () => {
	setConfiguration("commandLineExecution", "value", null);
}

const setCommandLineExecutionConfiguration = () => {
	setConfiguration("commandLineExecution", "value", "E:\\Documents\\Utilities\\Windows\\Coding\\opt\\jdk-10\\bin\\java");
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

const cleanIncludeConfiguration = () => {
	setConfiguration("include", "value", []);
}

const setIncludeConfiguration = () => {
	setConfiguration("include", "value", ["ADDED", "UNKNOWN"]);
}

const cleanGoalConfiguration = () => {
	setConfiguration("goal", "value", "mutationCoverage");
}

const setGoalConfiguration = () => {
	setConfiguration("goal", "value", "scmMutationCoverage");
}

const cleanShowWebResultsConfiguration = () => {
	setConfiguration("showWebResults", "value", false);
}


module.exports = {
    cleanOutputFileConfiguration,
	setOutputFileConfiguration,
	cleanExecutionModeConfiguration,
	setExecutionModeConfiguration,
    cleanMavenExecutionConfiguration,
	setMavenExecutionConfiguration,
	cleanCommandLineExecutionConfiguration,
	setCommandLineExecutionConfiguration,
	cleanWithHistoryConfiguration,
	setWithHistoryConfiguration,
	cleanMutationThresholdConfiguration,
	setMutationThresholdConfiguration,
	cleanIncludeConfiguration,
	setIncludeConfiguration,
	cleanGoalConfiguration,
	setGoalConfiguration,
	cleanShowWebResultsConfiguration,
}