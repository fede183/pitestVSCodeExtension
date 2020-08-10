const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMutationThresholdPropertyValue, getTerminalMutationThresholdProperty } = require('../../Properties/TerminalProperties/PostProperties/MutationThresholdProperty');

const { cleanMutationThresholdConfiguration, setMutationThresholdConfiguration, setExecutionModeConfiguration } = require('../testModules/setProperties');

const { executeWhenForMutationThresholdSet, executeWhenForExecutionModeCommandLineSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("MutationThresholdProperty for Maven", 
"mutationThreshold", 
cleanMutationThresholdConfiguration, 
setMutationThresholdConfiguration, 
getMutationThresholdPropertyValue, 
getTerminalMutationThresholdProperty, 
value => value ? ` -DmutationThreshold=${value}` : '', 
executeWhenForMutationThresholdSet);

getSimplePropertyTest("MutationThresholdProperty for Java", 
"mutationThreshold", 
() => {
    cleanMutationThresholdConfiguration();
    setExecutionModeConfiguration();
}, 
() => {
    setMutationThresholdConfiguration();
    setExecutionModeConfiguration();
},
getMutationThresholdPropertyValue, 
getTerminalMutationThresholdProperty, 
value => value ? ` --mutationThreshold=${value}` : '', 
program => 
    executeWhenForExecutionModeCommandLineSet(() => 
        executeWhenForMutationThresholdSet(program)),
executeWhenForExecutionModeCommandLineSet);
