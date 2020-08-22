const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMavenExecutionPropertyValue, getTerminalExecutionProperty } = require('../../Properties/TerminalProperties/ExecutionProperties/ExecutionProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForMavenExecutionSet, executeWhenForExecutionModeMavenSet } = require('../testModules/executeWhenModule');

const configurationName = "mavenExecution";

getSimplePropertyTest("MavenExecutionProperty", 
configurationName, 
() => {
    setCleanConfiguration("executionMode");
    setCleanConfiguration(configurationName);
},  
() => {
    setCleanConfiguration("executionMode");
    setDefaultConfiguration(configurationName)
}, 
getMavenExecutionPropertyValue, 
getTerminalExecutionProperty, 
value => (value ? value + ".cmd" : "mvn") + " ", 
executeWhenForMavenExecutionSet,
executeWhenForExecutionModeMavenSet);
