const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getExecutionModePropertyValue, getTerminalExecutionProperty } = require('../../Properties/TerminalProperties/ExecutionProperties/ExecutionProperty');

const { cleanExecutionModeConfiguration, setExecutionModeConfiguration } = require('../testModules/setProperties');

const { executeWhenForExecutionModeMavenSet, executeWhenForExecutionModeCommandLineSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("ExecutionModeProperty", 
"executionMode", 
cleanExecutionModeConfiguration,  
() => setExecutionModeConfiguration(), 
getExecutionModePropertyValue, 
getTerminalExecutionProperty, 
value => (value === "Maven" ? "mvn" : "java -classpath \"target/classes:target/test-classes:../../PiTEST/pitest-1.4.10.jar:../../PiTEST/pitest-command-line-1.4.10.jar:../../PiTEST/pitest-entry-1.4.10.jar:../../PiTEST/junit-4.11.jar\"") + " ", 
executeWhenForExecutionModeCommandLineSet,
executeWhenForExecutionModeMavenSet);
