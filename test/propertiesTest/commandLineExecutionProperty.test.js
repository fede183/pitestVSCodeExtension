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
value => (value ? value + ".exe" : "java") + 
" -classpath \"target/classes:target/test-classes:../../PiTEST/pitest-1.4.10.jar:../../PiTEST/pitest-command-line-1.4.10.jar:../../PiTEST/pitest-entry-1.4.10.jar:../../PiTEST/junit-4.11.jar\" ", 
executeWhenForCommandLineExecutionSet, 
executeWhenForExecutionModeCommandLineSet);
