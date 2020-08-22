
const { getTerminalProperty } = require('../../Properties/Property');
const { constructPropertyTerminalName } = require('./constructPropertyTerminalName');


const getTerminalPropertyGeneric = (propertyName, getForMaven, getForCommandLine) => 
    getTerminalProperty('executionMode', 'value', executionMode => {
        const getFunction = executionMode === "Maven" ? getForMaven : getForCommandLine;
        const terminalPropertyName = constructPropertyTerminalName(executionMode, propertyName);
        const terminalPropertyValue = getTerminalProperty(propertyName, 'value', getFunction);

        return terminalPropertyValue ? ` ${terminalPropertyName}=${terminalPropertyValue}` : "";
    });

module.exports = {
    getTerminalPropertyGeneric,
}