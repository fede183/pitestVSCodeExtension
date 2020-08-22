const { getValue, getTerminalProperty } = require('../../Property');

const getExecutionModePropertyValue = () => {
    return getValue('executionMode', 'value');
}

const getMavenExecutionPropertyValue = () => getValue('mavenExecution', 'value');

const getCommandLineExecutionPropertyValue = () => getValue('commandLineExecution', 'value');

const getTerminalExecutionPropertyFunctionForMaven = mavenExecution => (mavenExecution ? mavenExecution + ".cmd" : "mvn") + " ";

const getTerminalExecutionPropertyFunctionForCommandLine = javaExecution => (javaExecution ? javaExecution + ".exe" : "java") + " -classpath \"target/classes:target/test-classes:../../PiTEST/pitest-1.4.10.jar:../../PiTEST/pitest-command-line-1.4.10.jar:../../PiTEST/pitest-entry-1.4.10.jar:../../PiTEST/junit-4.11.jar\" ";

const getTerminalExecutionProperty = () => 
    getTerminalProperty('executionMode', 'value', executionMode => {
        if (executionMode === "Maven") {
            return getTerminalProperty('mavenExecution', 'value', getTerminalExecutionPropertyFunctionForMaven);
        }
        return getTerminalProperty('commandLineExecution', 'value', getTerminalExecutionPropertyFunctionForCommandLine); 
    }
);

module.exports = {
    getExecutionModePropertyValue,
    getMavenExecutionPropertyValue,
    getCommandLineExecutionPropertyValue,
    getTerminalExecutionProperty,
    getTerminalExecutionPropertyFunctionForMaven,
    getTerminalExecutionPropertyFunctionForCommandLine,
}