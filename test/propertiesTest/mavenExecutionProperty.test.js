const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMavenExecutionPropertyValue, getTerminalExecutionProperty } = require('../../Properties/TerminalProperties/ExecutionProperties/ExecutionProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForMavenExecutionSet, executeWhenForExecutionModeMavenSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("MavenExecutionProperty", 
"mavenExecution", 
() => {
    setCleanConfiguration("executionMode");
    setCleanConfiguration("mavenExecution");
},  
() => {
    setCleanConfiguration("executionMode");
    setDefaultConfiguration("mavenExecution")
}, 
getMavenExecutionPropertyValue, 
getTerminalExecutionProperty, 
value => (value ? value + ".cmd" : "mvn") + " ", 
executeWhenForMavenExecutionSet,
executeWhenForExecutionModeMavenSet);
