const { getValue, getTerminalProperty } = require('../../Property');

const getExecutionModePropertyValue = () => {
    return getValue('executionMode', 'value');
}

const getMavenExecutionPropertyValue = () => {
    return getValue('mavenExecution', 'value');
}

const getCommandLineExecutionPropertyValue = () => {
    return getValue('commandLineExecution', 'value');
}

const getTerminalExecutionProperty = () => 
    getTerminalProperty('executionMode', 'value', executionMode => {
        if (executionMode === "Maven") {
            return getTerminalProperty('mavenExecution', 'value', 
                mavenExecution => mavenExecution ? mavenExecution + ".cmd" : "mvn") + " ";
        }
        return getTerminalProperty('commandLineExecution', 'value', 
            javaExecution => javaExecution ? javaExecution + ".exe" : "java") + 
            " -classpath \"target/classes:target/test-classes:../../PiTEST/pitest-1.4.10.jar:../../PiTEST/pitest-command-line-1.4.10.jar:../../PiTEST/pitest-entry-1.4.10.jar:../../PiTEST/junit-4.11.jar\" ";
    }
);

module.exports = {
    getExecutionModePropertyValue,
    getMavenExecutionPropertyValue,
    getCommandLineExecutionPropertyValue,
    getTerminalExecutionProperty,
}