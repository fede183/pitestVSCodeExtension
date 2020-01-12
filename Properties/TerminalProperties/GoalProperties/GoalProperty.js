const { getValue, getTerminalProperty } = require('../../Property');

const getGoalPropertyValue = () => {
    return getValue('goal', 'value');
}

const getTerminalGoalProperty = () => 
    getTerminalProperty('goal', 'value', value => `org.pitest:pitest-maven:${value}`);

module.exports = {
    getGoalPropertyValue,
    getTerminalGoalProperty,
}