const { getValue, getTerminalProperty } = require('../../Property');
const { getTerminalPropertyGeneric } = require('../../../test/testModules/getTerminalPropertyGeneric');

const getMutationThresholdPropertyValue = () => getValue('mutationThreshold', 'value');

const getTerminalMutationThresholdPropertyForMaven = value => value ? value : ''

const getTerminalMutationThresholdPropertyForCommandLine = getTerminalMutationThresholdPropertyForMaven;

const getTerminalMutationThresholdProperty = () => 
getTerminalPropertyGeneric('mutationThreshold', 
getTerminalMutationThresholdPropertyForMaven, 
getTerminalMutationThresholdPropertyForCommandLine);

module.exports = {
    getMutationThresholdPropertyValue,
    getTerminalMutationThresholdProperty,
}