// You can import and use all API from the 'vscode' module
// as well as import your extension to test it

//FileSystem
const fs = require("fs");
const vscode = require('vscode');

const { getValue } = require('../../Properties/Property');

const { executeWhenConditionIsReach } = require('../../executeWhenConditionIsReach');

//Directories
const { testCommandLineResults, targetDirectory } = require('./testDirModule');

/**
 * @param {string} filePath
 * @param {() => void} program
 */
const executeWhenFileIsAvailable = (filePath, program) => {
	let delInterval = setInterval(checkIfFileIsAvailable, 1000);
	function checkIfFileIsAvailable() {
		if (fs.existsSync(filePath)) {
			fs.open(filePath, 'r+', function(err, fd) {
				if (err && err.code === 'EBUSY') {
					//do nothing till next loop
				} else if (err && err.code === 'ENOENT') {
					clearInterval(delInterval);
				} else {
					fs.close(fd, function() {
						clearInterval(delInterval);
						program();
					});
				}
			});
		}
	}	
}

const executeWhenTestCommandLineResultFileIsAvailable = (program) =>
	executeWhenTerminalIsOutOfUse(() => 
		executeWhenFileIsAvailable(testCommandLineResults.getDir(), program));

const executeWhenConditionIsReachAndTestFileIsComplete = (condition, program) => {
	executeWhenConditionIsReach(condition, 
		() => executeWhenFileIsAvailable(testCommandLineResults.getDir(), program));
};

const targetDirectoryStructIsCorrect = (directories) => {
	return fs.existsSync(targetDirectory.getDir()) && 
	directories.every((directory) => fs.existsSync(targetDirectory.addDir(directory)));
} 

const executeWhenBuildIsDone = (program) => {
	const directories = ["classes", "coverage-reports", "maven-archiver", "maven-status", "site", 
	"surefire-reports", "test-classes", "stackar-1.0-SNAPSHOT.jar"];
	executeWhenConditionIsReachAndTestFileIsComplete(() => targetDirectoryStructIsCorrect(directories), 
	program);
}

const executeWhenPitestIsDoneForEmpty = (program) => {
	const directories = ["pit-reports"];
	executeWhenConditionIsReach(() => targetDirectoryStructIsCorrect(directories), program);
}

const executeWhenPitestIsDone = (program) => 
	executeWhenTerminalIsOutOfUse(() => executeWhenPitestIsDoneForEmpty(program));

const conditionForBooleanProperty = (configName) => getValue(configName, 'value')

const conditionForEqualProperties = (configName, defaultEqualValue) => getValue(configName, 'value') === defaultEqualValue; 

const conditionForDiffProperties = (configName, defaultDiffValue) => getValue(configName, 'value') !== defaultDiffValue; 

const conditionForSaveResultSet = () => conditionForBooleanProperty('saveResult');

const conditionForExecutionModeMavenSet = () => conditionForEqualProperties('executionMode', 'Maven');

const conditionForExecutionModeCommandLineSet = () => conditionForEqualProperties('executionMode', 'Command-Line');

const conditionForMavenExecutionSet = () => conditionForExecutionModeMavenSet() && 
	conditionForBooleanProperty('mavenExecution');

const conditionForCommandLineExecutionSet = () => conditionForExecutionModeCommandLineSet() && 
	conditionForBooleanProperty('commandLineExecution');

const conditionForWithHistorySet = () => conditionForBooleanProperty('withHistory');

const conditionForMutationThresholdSet = () => conditionForBooleanProperty('mutationThreshold');

const conditionForIncludeSet = () => conditionForDiffProperties('include', []);

const conditionForGoalSet = () => conditionForDiffProperties('goal', 'mutationCoverage');

const conditionTerminalIsOutOfUse = () => vscode.window.terminals.length === 0;

const executeWhenForSaveResultSet = (program) => {
	executeWhenConditionIsReach(conditionForSaveResultSet, program);
}

const executeWhenForExecutionModeMavenSet = (program) => {
	executeWhenConditionIsReach(conditionForExecutionModeMavenSet, program);
}

const executeWhenForExecutionModeCommandLineSet = (program) => {
	executeWhenConditionIsReach(conditionForExecutionModeCommandLineSet, program);
}

const executeWhenForMavenExecutionSet = (program) => {
	executeWhenConditionIsReach(conditionForMavenExecutionSet, program);
}

const executeWhenForCommandLineExecutionSet = (program) => {
	executeWhenConditionIsReach(conditionForCommandLineExecutionSet, program);
}

const executeWhenForWithHistorySet = (program) => {
	executeWhenConditionIsReach(conditionForWithHistorySet, program);
}

const executeWhenForMutationThresholdSet = (program) => {
	executeWhenConditionIsReach(conditionForMutationThresholdSet, program);
}

const executeWhenForIncludeSet = (program) => {
	executeWhenConditionIsReach(conditionForIncludeSet, program);
}

const executeWhenForGoalSet = (program) => {
	executeWhenConditionIsReach(conditionForGoalSet, program);
}

const executeWhenTerminalIsOutOfUse = (program) =>
	executeWhenConditionIsReach(conditionTerminalIsOutOfUse, program);


module.exports = {
	executeWhenFileIsAvailable,
	executeWhenConditionIsReach,
	executeWhenBuildIsDone,
	executeWhenPitestIsDone,
	executeWhenPitestIsDoneForEmpty,
	executeWhenForSaveResultSet,
	executeWhenTestCommandLineResultFileIsAvailable,
	executeWhenForExecutionModeMavenSet,
	executeWhenForExecutionModeCommandLineSet,
	executeWhenForMavenExecutionSet,
	executeWhenForCommandLineExecutionSet,
	executeWhenForWithHistorySet,
	executeWhenForMutationThresholdSet,
	executeWhenForIncludeSet,
	executeWhenForGoalSet,
}