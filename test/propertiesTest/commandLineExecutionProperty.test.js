const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getCommandLineExecutionPropertyValue, getTerminalExecutionProperty } = require('../../Properties/TerminalProperties/ExecutionProperties/ExecutionProperty');

const { cleanCommandLineExecutionConfiguration, setCommandLineExecutionConfiguration, setExecutionModeConfiguration } = require('../testModules/setProperties');

const { executeWhenForCommandLineExecutionSet, executeWhenForExecutionModeCommandLineSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("CommandLineExecutionProperty", 
"commandLineExecution", 
() => {
    setExecutionModeConfiguration("Command-Line");
    cleanCommandLineExecutionConfiguration();
}, 
setCommandLineExecutionConfiguration, 
getCommandLineExecutionPropertyValue, 
getTerminalExecutionProperty, 
value => (value ? value + ".exe" : "java") + " ", 
executeWhenForCommandLineExecutionSet, 
executeWhenForExecutionModeCommandLineSet);
