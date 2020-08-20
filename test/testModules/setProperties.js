const vscode = require('vscode');

const { testCommandLineResults } = require('./testDirModule');

const setConfiguration = function (configName, valueName, value) {
	let config = vscode.workspace.getConfiguration(configName);
	
	let setAsGlobal = config.inspect(valueName).workspaceValue == undefined;
	config.update(valueName, value, setAsGlobal);
}

const cleanProperties = [ 
	"saveResult", 
	"executionMode", 
	"mavenExecution",
	"commandLineExecution",
	"withHistory",
	"mutationThreshold",
	"include",
	"goal",
	"showWebResults",
	"mutators",
	"timeoutConstant",
];

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
	mutators: [],
	timeoutConstant: 4000,
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
	mutators: ["CONSTRUCTOR_CALLS", "NON_VOID_METHOD_CALLS"],
	timeoutConstant: 6000,
};

const setConfigurationWithDefaultValues = (configName, defaultValues) => 
	setConfiguration(configName, "value", defaultValues[configName]);

const setCleanConfiguration = (configName) => setConfigurationWithDefaultValues(configName, defaultCleanValues);

const setDefaultConfiguration = (configName) => setConfigurationWithDefaultValues(configName, defaultSetValues);


module.exports = {
	cleanProperties,
	setCleanConfiguration,
	setDefaultConfiguration,
}