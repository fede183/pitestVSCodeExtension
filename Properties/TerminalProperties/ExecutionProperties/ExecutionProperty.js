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
            javaExecution => javaExecution ? javaExecution + ".exe" : "java") + " ";
    }
);

module.exports = {
    getExecutionModePropertyValue,
    getMavenExecutionPropertyValue,
    getCommandLineExecutionPropertyValue,
    getTerminalExecutionProperty,
}