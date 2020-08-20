const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getWithHistoryPropertyValue, getTerminalWithHistoryProperty } = require('../../Properties/TerminalProperties/PostProperties/WithHistoryProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForWithHistorySet } = require('../testModules/executeWhenModule');

const configurationPropery = "withHistory";

getSimplePropertyTest("WithHistoryProperty", 
configurationPropery, 
() => setCleanConfiguration(configurationPropery), 
() => setDefaultConfiguration(configurationPropery), 
getWithHistoryPropertyValue, 
getTerminalWithHistoryProperty, 
value => value ? ' -DwithHistory' : '', 
executeWhenForWithHistorySet);
