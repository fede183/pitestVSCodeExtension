const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMutationThresholdPropertyValue, getTerminalMutationThresholdProperty } = require('../../Properties/PostProperties/MutationThresholdProperty');

const { cleanMutationThresholdConfiguration, setMutationThresholdConfiguration } = require('../testModules/setProperties');

const { executeWhenForMutationThresholdSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("MutationThresholdProperty", "mutationThreshold", cleanMutationThresholdConfiguration, setMutationThresholdConfiguration, 
getMutationThresholdPropertyValue, getTerminalMutationThresholdProperty, value => value ? ` -DmutationThreshold=${value}` : '', executeWhenForMutationThresholdSet);

