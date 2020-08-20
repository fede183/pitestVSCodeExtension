const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMutationThresholdPropertyValue, getTerminalMutationThresholdProperty } = require('../../Properties/TerminalProperties/PostProperties/MutationThresholdProperty');

const { setDefaultConfiguration, setCleanConfiguration } = require('../testModules/setProperties');

const { executeWhenForMutationThresholdSet, executeWhenForExecutionModeCommandLineSet } = require('../testModules/executeWhenModule');

const configurationPropery = "mutationThreshold";

getSimplePropertyTest("MutationThresholdProperty for Maven", 
configurationPropery, 
() => setCleanConfiguration(configurationPropery), 
() => setDefaultConfiguration(configurationPropery), 
getMutationThresholdPropertyValue, 
getTerminalMutationThresholdProperty, 
value => value ? ` -DmutationThreshold=${value}` : '', 
executeWhenForMutationThresholdSet);

getSimplePropertyTest("MutationThresholdProperty for Java", 
configurationPropery, 
() => {
    setCleanConfiguration(configurationPropery);
    setDefaultConfiguration("executionMode");
}, 
() => {
    setDefaultConfiguration(configurationPropery);
    setDefaultConfiguration("executionMode");
},
getMutationThresholdPropertyValue, 
getTerminalMutationThresholdProperty, 
value => value ? ` --mutationThreshold=${value}` : '', 
program => 
    executeWhenForExecutionModeCommandLineSet(() => 
        executeWhenForMutationThresholdSet(program)),
executeWhenForExecutionModeCommandLineSet);
