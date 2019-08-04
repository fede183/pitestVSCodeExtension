// You can import and use all API from the 'vscode' module
// as well as import your extension to test it

//FileSystem
const fs = require("fs");

const { getValue } = require('../../Properties/Property');

//Directories
const { testCommandLineResults, targetDirectory } = require('./testDirModule');

/**
 * @param {string} filePath
 * @param {() => void} program
 */
const executeWhenFileIsAvailable = (filePath, program) => {
	var delInterval = setInterval(checkIfFileIsAvailable, 1000);
	function checkIfFileIsAvailable() {
		if(fs.existsSync(filePath)){
			fs.open(filePath, 'r+', function(err, fd){
				if (err && err.code === 'EBUSY'){
					//do nothing till next loop
				} else if (err && err.code === 'ENOENT'){
					clearInterval(delInterval);
				} else {
					fs.close(fd, function(){
						clearInterval(delInterval);
						program();
					});
				}
			});
		}
	}	
}

const conditionForSaveResultSet = () => {
	const value = getValue('saveResult');
	return value !== null;
}

const conditionForMavenExecutionSet = () => {
	const value = getValue('mavenExecution');
	return value !== null;
}

const conditionForWithHistorySet = () => {
	const value = getValue('withHistory');
	return value;
}

const executeWhenConditionIsReach = (condition, program) => {
	var delInterval = setInterval(checkConditionIsReach, 1000);
	function checkConditionIsReach() {
		if(condition()){
			clearInterval(delInterval);
			program();
		}
	}
}

const executeWhenTestCommandLineResultFileIsAvailable = (program) => executeWhenFileIsAvailable(testCommandLineResults.getDir(), program);

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

const executeWhenPitestIsDone = (program) => {
	const directories = ["pit-reports"];

	executeWhenConditionIsReachAndTestFileIsComplete(() => targetDirectoryStructIsCorrect(directories), 
	program);
}

const executeWhenForSaveResultSet = (program) => {
	executeWhenConditionIsReach(conditionForSaveResultSet, program);
}

const executeWhenForMavenExecutionSet = (program) => {
	executeWhenConditionIsReach(conditionForMavenExecutionSet, program);
}

const executeWhenForWithHistorySet = (program) => {
	executeWhenConditionIsReach(conditionForWithHistorySet, program);
}

module.exports = {
	executeWhenFileIsAvailable,
	executeWhenConditionIsReach,
	executeWhenBuildIsDone,
	executeWhenPitestIsDone,
	executeWhenPitestIsDoneForEmpty,
	executeWhenForSaveResultSet,
	executeWhenTestCommandLineResultFileIsAvailable,
	executeWhenForMavenExecutionSet,
	executeWhenForWithHistorySet,
}