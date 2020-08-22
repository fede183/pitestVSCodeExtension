const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getTimeoutFactorPropertyValue, getTerminalTimeoutFactorProperty } = require('../../Properties/TerminalProperties/PostProperties/TimeoutFactorProperty');

const { setDefaultConfiguration, setCleanConfiguration } = require('../testModules/setProperties');

const { executeWhenForTimeoutFactorSet, executeWhenForExecutionModeMavenSet, executeWhenForExecutionModeCommandLineSet } = require('../testModules/executeWhenModule');

const configurationName = "timeoutFactor";

getSimplePropertyTest("TimeoutFactorProperty for Maven", 
configurationName, 
() => {
    setCleanConfiguration("executionMode");
    setCleanConfiguration(configurationName);
},
() => { 
    setCleanConfiguration("executionMode");
    setDefaultConfiguration(configurationName);
}, 
getTimeoutFactorPropertyValue, 
getTerminalTimeoutFactorProperty, 
value => value && value !== 1.25 ? ` -DtimeoutFactor=${value}` : '', 
program => 
    executeWhenForExecutionModeMavenSet(() => 
    executeWhenForTimeoutFactorSet(program)),
executeWhenForExecutionModeMavenSet);

getSimplePropertyTest("TimeoutFactorProperty for Java", 
configurationName, 
() => {
    setDefaultConfiguration("executionMode");
    setCleanConfiguration(configurationName);
},
() => { 
    setDefaultConfiguration("executionMode");
    setDefaultConfiguration(configurationName);
}, 
getTimeoutFactorPropertyValue, 
getTerminalTimeoutFactorProperty, 
value => value && value !== 1.25 ? ` --timeoutFactor=${value}` : '', 
executeWhenForTimeoutFactorSet,
executeWhenForExecutionModeCommandLineSet);
