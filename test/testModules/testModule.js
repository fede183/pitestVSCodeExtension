// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

//FileSystem
const fs = require("fs");

//Directory management
const { DirectoryManagement } = require('../../components/DirectoryManagement');

const dirOfTest = __dirname.replace("\\testModules", "").replace("/testModules", "");

const dirName = new DirectoryManagement(dirOfTest);

const stackDirectory = new DirectoryManagement(dirName.addDir("Stack"));

const emptyDirectory = new DirectoryManagement(dirName.addDir("Empty"));

const targetDirectory = new DirectoryManagement(stackDirectory.addDir("target"));

const testCommandLineResults = new DirectoryManagement(dirName.addDir("testCommandLineResults"));

//Build Project
const buildProgram = /**
 * @param {{ addDir: (arg0: string) => import("fs").PathLike; getDir: () => string; }} projectDirectory
 */
 function(projectDirectory) {
	if (!fs.existsSync(projectDirectory.addDir("pom.xml"))) {
		return;
	}
	const terminal = vscode.window.createTerminal();
	terminal.show();
	terminal.sendText('cd ' + projectDirectory.getDir());
	printCommandResults(terminal, 'mvn clean install');
}

//Print command results
/**
 * @param {import("vscode").Terminal} terminal
 * @param {string} command
 */
const printCommandResults = (terminal, command) => {
	terminal.sendText(command + ' > ' + testCommandLineResults.getDir());
}

//Clean Project
const cleanProgram = () => {
	if(fs.existsSync(targetDirectory.getDir())){
		const rimraf = require('rimraf');
		rimraf(targetDirectory.getDir(), () => {});
	}
	if(fs.existsSync(testCommandLineResults.getDir())){
		fs.unlinkSync(testCommandLineResults.getDir());
	}
	cleanOutputFileConfiguration();
	vscode.window.terminals.forEach(terminal => {
		terminal.dispose();
	});
}

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
	const saveResult = vscode.workspace.getConfiguration('saveResult');
	const saveOutpuInFile = saveResult.get('saveInOutPutFile');
	return saveOutpuInFile;
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

module.exports = {
    dirName,
    stackDirectory,
    emptyDirectory,
    targetDirectory,
    testCommandLineResults,
    buildProgram,
    printCommandResults,
    cleanProgram,
    cleanOutputFileConfiguration,
    setOutputFileConfiguration,
	executeWhenFileIsAvailable,
	executeWhenConditionIsReach,
	conditionForSaveResultSet,
	executeWhenBuildIsDone,
	executeWhenPitestIsDone,
	executeWhenPitestIsDoneForEmpty,
}