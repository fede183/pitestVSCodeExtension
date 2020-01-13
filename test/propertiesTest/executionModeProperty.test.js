const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getExecutionModePropertyValue, getTerminalExecutionProperty } = require('../../Properties/TerminalProperties/ExecutionProperties/ExecutionProperty');

const { cleanExecutionModeConfiguration, setExecutionModeConfiguration } = require('../testModules/setProperties');

const { executeWhenForExecutionModeMavenSet, executeWhenForExecutionModeCommandLineSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("ExecutionModeProperty", 
"executionMode", 
cleanExecutionModeConfiguration,  
() => setExecutionModeConfiguration("Command-Line"), 
getExecutionModePropertyValue, 
getTerminalExecutionProperty, 
value => (value === "Maven" ? "mvn" : "java") + " ", 
executeWhenForExecutionModeCommandLineSet,
executeWhenForExecutionModeMavenSet);
