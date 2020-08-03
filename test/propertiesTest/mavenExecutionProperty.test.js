const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMavenExecutionPropertyValue, getTerminalExecutionProperty } = require('../../Properties/TerminalProperties/ExecutionProperties/ExecutionProperty');

const { cleanMavenExecutionConfiguration, setMavenExecutionConfiguration, cleanExecutionModeConfiguration } = require('../testModules/setProperties');

const { executeWhenForMavenExecutionSet, executeWhenForExecutionModeMavenSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("MavenExecutionProperty", 
"mavenExecution", 
() => {
    cleanExecutionModeConfiguration();
    cleanMavenExecutionConfiguration();
},  
setMavenExecutionConfiguration, 
getMavenExecutionPropertyValue, 
getTerminalExecutionProperty, 
value => (value ? value + ".cmd" : "mvn") + " ", 
executeWhenForMavenExecutionSet,
executeWhenForExecutionModeMavenSet);
