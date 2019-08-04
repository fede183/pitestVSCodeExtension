const { getValue, getTerminalProperty } = require('../Property');

const getMutationThresholdPropertyValue = () => getValue('mutationThreshold', 'value');

const getTerminalMutationThresholdProperty = () => getTerminalProperty('mutationThreshold', 'value', value => value ? ` -DmutationThreshold=${value}` : '');

module.exports = {
    getMutationThresholdPropertyValue,
    getTerminalMutationThresholdProperty,
}