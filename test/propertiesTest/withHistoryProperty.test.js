const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getWithHistoryPropertyValue, getTerminalWithHistoryProperty } = require('../../Properties/TerminalProperties/PostProperties/WithHistoryProperty');

const { cleanWithHistoryConfiguration, setWithHistoryConfiguration } = require('../testModules/setProperties');

const { executeWhenForWithHistorySet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("WithHistoryProperty", "withHistory", cleanWithHistoryConfiguration, setWithHistoryConfiguration, 
getWithHistoryPropertyValue, getTerminalWithHistoryProperty, value => value ? ' -DwithHistory' : '', executeWhenForWithHistorySet);
