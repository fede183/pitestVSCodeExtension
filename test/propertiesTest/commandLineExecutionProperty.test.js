const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getCommandLineExecutionPropertyValue, getTerminalExecutionProperty, getTerminalExecutionPropertyFunctionForCommandLine } = require('../../Properties/TerminalProperties/ExecutionProperties/ExecutionProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForCommandLineExecutionSet, executeWhenForExecutionModeCommandLineSet } = require('../testModules/executeWhenModule');

const configurationName = "commandLineExecution";

getSimplePropertyTest("CommandLineExecutionProperty", 
configurationName, 
() => {
    setDefaultConfiguration("executionMode");
    setCleanConfiguration(configurationName);
}, 
() => setDefaultConfiguration(configurationName), 
getCommandLineExecutionPropertyValue, 
getTerminalExecutionProperty, 
getTerminalExecutionPropertyFunctionForCommandLine,
executeWhenForCommandLineExecutionSet, 
executeWhenForExecutionModeCommandLineSet);
