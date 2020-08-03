const { getValue, getTerminalProperty } = require('../../Property');

const getGoalPropertyValue = () => {
    return getValue('goal', 'value');
}

const getTerminalGoalProperty = () => getTerminalProperty('executionMode', 'value', executionMode => {
    if (executionMode === "Maven") {
        return getTerminalProperty('goal', 'value', value => `org.pitest:pitest-maven:${value}`);
    }
    return "org.pitest.mutationtest.commandline.MutationCoverageReport --reportDir target/pit-reports --targetClasses org.autotest.StackAr --targetTests org.autotest.TestStackAr --sourceDirs src/main/,src/test/";
});

module.exports = {
    getGoalPropertyValue,
    getTerminalGoalProperty,
}