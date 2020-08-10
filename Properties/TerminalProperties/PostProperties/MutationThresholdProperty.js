const { getValue, getTerminalProperty } = require('../../Property');

const getMutationThresholdPropertyValue = () => getValue('mutationThreshold', 'value');

const getTerminalMutationThresholdProperty = () => 
    getTerminalProperty('executionMode', 'value', executionMode => {
        if (executionMode === "Maven") {
            return getTerminalProperty('mutationThreshold', 'value', 
                value => value ? ` -DmutationThreshold=${value}` : '');
        }
        return getTerminalProperty('mutationThreshold', 'value', 
            value => value ? ` --mutationThreshold=${value}` : '');
    });

module.exports = {
    getMutationThresholdPropertyValue,
    getTerminalMutationThresholdProperty,
}