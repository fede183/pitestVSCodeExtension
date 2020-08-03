const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getExecutionModePropertyValue } = require('../../Properties/TerminalProperties/ExecutionProperties/ExecutionProperty');

const { getGoalPropertyValue, getTerminalGoalProperty } = require('../../Properties/TerminalProperties/GoalProperties/GoalProperty');

const { cleanGoalConfiguration, setGoalConfiguration } = require('../testModules/setProperties');

const { executeWhenForGoalSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("GoalProperty", 
"goal", 
cleanGoalConfiguration, 
setGoalConfiguration, 
getGoalPropertyValue, 
getTerminalGoalProperty, 
value => getExecutionModePropertyValue() === "Maven" ? `org.pitest:pitest-maven:${value}` : "org.pitest.mutationtest.commandline.MutationCoverageReport --reportDir target/pit-reports --targetClasses org.autotest.StackAr --targetTests org.autotest.TestStackAr --sourceDirs src/main/,src/test/", 
executeWhenForGoalSet);
