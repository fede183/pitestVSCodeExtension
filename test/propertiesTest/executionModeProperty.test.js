const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getExecutionModePropertyValue, getTerminalExecutionProperty, } = require('../../Properties/TerminalProperties/ExecutionProperties/ExecutionProperty');

const { setDefaultConfiguration, setCleanConfiguration } = require('../testModules/setProperties');

const { executeWhenForExecutionModeMavenSet, executeWhenForExecutionModeCommandLineSet } = require('../testModules/executeWhenModule');

const configurationName = "executionMode";

getSimplePropertyTest("ExecutionModeProperty", 
configurationName, 
() => setCleanConfiguration(configurationName),  
() => setDefaultConfiguration(configurationName), 
getExecutionModePropertyValue, 
getTerminalExecutionProperty, 
value => (value === "Maven" ? "mvn" : "java -classpath \"target/classes:target/test-classes:../../PiTEST/pitest-1.4.10.jar:../../PiTEST/pitest-command-line-1.4.10.jar:../../PiTEST/pitest-entry-1.4.10.jar:../../PiTEST/junit-4.11.jar\"") + " ", 
executeWhenForExecutionModeCommandLineSet,
executeWhenForExecutionModeMavenSet);
