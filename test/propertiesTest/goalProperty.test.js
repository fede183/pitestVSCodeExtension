const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getGoalPropertyValue, getTerminalGoalProperty } = require('../../Properties/GoalProperties/GoalProperty');

const { cleanGoalConfiguration, setGoalConfiguration } = require('../testModules/setProperties');

const { executeWhenForGoalSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("GoalProperty", "goal", cleanGoalConfiguration, setGoalConfiguration, 
getGoalPropertyValue, getTerminalGoalProperty, value => `org.pitest:pitest-maven:${value}`, executeWhenForGoalSet);
