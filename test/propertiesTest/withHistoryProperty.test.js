const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getWithHistoryPropertyValue, getTerminalWithHistoryProperty } = require('../../Properties/TerminalProperties/PostProperties/WithHistoryProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForWithHistorySet } = require('../testModules/executeWhenModule');

const configurationName = "withHistory";

getSimplePropertyTest("WithHistoryProperty", 
configurationName, 
() => setCleanConfiguration(configurationName), 
() => setDefaultConfiguration(configurationName), 
getWithHistoryPropertyValue, 
getTerminalWithHistoryProperty, 
value => value ? ' -DwithHistory' : '', 
executeWhenForWithHistorySet);
