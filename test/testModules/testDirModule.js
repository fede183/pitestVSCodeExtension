//Directory management
const { DirectoryManagement } = require('../../components/DirectoryManagement');

const dirOfTest = __dirname.replace("\\testModules", "").replace("/testModules", "");

const dirName = new DirectoryManagement(dirOfTest);

const stackDirectory = new DirectoryManagement(dirName.addDir("Stack"));

const emptyDirectory = new DirectoryManagement(dirName.addDir("Empty"));

const targetDirectory = new DirectoryManagement(stackDirectory.addDir("target"));

const testCommandLineResults = new DirectoryManagement(dirName.addDir("testCommandLineResults"));

const readMode = 'utf8';

module.exports = {
    dirName,
    stackDirectory,
    emptyDirectory,
    targetDirectory,
    testCommandLineResults,
    readMode,
}