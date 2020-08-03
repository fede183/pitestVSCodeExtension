const vscode = require('vscode');

const { testCommandLineResults } = require('./testDirModule');

const setConfiguration = function (configName, valueName, value) {
	let config = vscode.workspace.getConfiguration(configName);
	
	let setAsGlobal = config.inspect(valueName).workspaceValue == undefined;
	config.update(valueName, value, setAsGlobal);
}

const defaultCleanValues = { 
	saveResult: "", 
	executionMode: "Maven", 
	mavenExecution: "",
	commandLineExecution: "",
	withHistory: false,
	mutationThreshold: 0,
	include: [],
	goal: "mutationCoverage",
	showWebResults: false,
};

const defaultSetValues = { 
	saveResult: testCommandLineResults.getDir(), 
	executionMode: "Command-Line",
	mavenExecution: "E:\\Documents\\Utilities\\Windows\\Coding\\opt\\apache-maven-3.6.3\\bin\\mvn",
	commandLineExecution: "E:\\Documents\\Utilities\\Windows\\Coding\\opt\\jdk-10\\bin\\java",
	withHistory: true,
	mutationThreshold: 85,
	include: ["ADDED", "UNKNOWN"],
	goal: "scmMutationCoverage",
};

const setConfigurationWithDefaultValues = (configName, defaultValues) => 
	setConfiguration(configName, "value", defaultValues[configName]);

const setCleanConfiguration = (configName) => setConfigurationWithDefaultValues(configName, defaultCleanValues);

const setSetConfiguration = (configName) => setConfigurationWithDefaultValues(configName, defaultSetValues);

const cleanOutputFileConfiguration = () => {
	setCleanConfiguration("saveResult");
}

const setOutputFileConfiguration = () => {
	setSetConfiguration("saveResult");
}

const cleanExecutionModeConfiguration = () => {
	setCleanConfiguration("executionMode");
}

const setExecutionModeConfiguration = () => {
	setSetConfiguration("executionMode");
}

const cleanMavenExecutionConfiguration = () => {
	setCleanConfiguration("mavenExecution");
}

const setMavenExecutionConfiguration = () => {
	setSetConfiguration("mavenExecution");
}

const cleanCommandLineExecutionConfiguration = () => {
	setCleanConfiguration("commandLineExecution");
}

const setCommandLineExecutionConfiguration = () => {
	setSetConfiguration("commandLineExecution");
}

const cleanWithHistoryConfiguration = () => {
	setCleanConfiguration("withHistory");
}

const setWithHistoryConfiguration = () => {
	setSetConfiguration("withHistory");
}

const cleanMutationThresholdConfiguration = () => {
	setCleanConfiguration("mutationThreshold");
}

const setMutationThresholdConfiguration = () => {
	setSetConfiguration("mutationThreshold");
}

const cleanIncludeConfiguration = () => {
	setCleanConfiguration("include");
}

const setIncludeConfiguration = () => {
	setSetConfiguration("include");
}

const cleanGoalConfiguration = () => {
	setCleanConfiguration("goal");
}

const setGoalConfiguration = () => {
	setSetConfiguration("goal");
}

const cleanShowWebResultsConfiguration = () => {
	setCleanConfiguration("showWebResults");
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