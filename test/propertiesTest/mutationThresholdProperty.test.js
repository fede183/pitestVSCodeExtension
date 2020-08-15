const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMutationThresholdPropertyValue, getTerminalMutationThresholdProperty } = require('../../Properties/TerminalProperties/PostProperties/MutationThresholdProperty');

const { setDefaultConfiguration, setCleanConfiguration } = require('../testModules/setProperties');

const { executeWhenForMutationThresholdSet, executeWhenForExecutionModeCommandLineSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("MutationThresholdProperty for Maven", 
"mutationThreshold", 
() => setCleanConfiguration("mutationThreshold"), 
() => setDefaultConfiguration("mutationThreshold"), 
getMutationThresholdPropertyValue, 
getTerminalMutationThresholdProperty, 
value => value ? ` -DmutationThreshold=${value}` : '', 
executeWhenForMutationThresholdSet);

getSimplePropertyTest("MutationThresholdProperty for Java", 
"mutationThreshold", 
() => {
    setCleanConfiguration("mutationThreshold");
    setDefaultConfiguration("executionMode");
}, 
() => {
    setDefaultConfiguration("mutationThreshold");
    setDefaultConfiguration("executionMode");
},
getMutationThresholdPropertyValue, 
getTerminalMutationThresholdProperty, 
value => value ? ` --mutationThreshold=${value}` : '', 
program => 
    executeWhenForExecutionModeCommandLineSet(() => 
        executeWhenForMutationThresholdSet(program)),
executeWhenForExecutionModeCommandLineSet);
