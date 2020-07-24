const { getValue, getTerminalProperty } = require('../../Property');

const getGoalPropertyValue = () => {
    return getValue('goal', 'value');
}

const getTerminalGoalProperty = () => getTerminalProperty('executionMode', 'value', executionMode => {
    if (executionMode === "Maven") {
        return getTerminalProperty('goal', 'value', value => `org.pitest:pitest-maven:${value}`);
    }
    return "";
});

module.exports = {
    getGoalPropertyValue,
    getTerminalGoalProperty,
}