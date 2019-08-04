const { getValue, getTerminalProperty } = require('../Property');

const getMutationThresholdPropertyValue = () => {
    return getValue('mutationThreshold', 'value');
}

const getTerminalMutationThresholdProperty = () => {
    return getTerminalProperty('mutationThreshold', 'value', value => value ? ` -DmutationThreshold=${value}` : '');
}

module.exports = {
    getMutationThresholdPropertyValue,
    getTerminalMutationThresholdProperty,
}