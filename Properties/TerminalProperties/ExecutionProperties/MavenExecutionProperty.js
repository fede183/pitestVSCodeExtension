const { getValue, getTerminalProperty } = require('../../Property');

const getMavenExecutionPropertyValue = () => {
    return getValue('mavenExecution', 'value');
}

const getTerminalMavenExecutionProperty = () => 
getTerminalProperty('mavenExecution', 'value', value => value ? value + ".cmd" : "mvn") + " ";

module.exports = {
    getMavenExecutionPropertyValue,
    getTerminalMavenExecutionProperty,
}