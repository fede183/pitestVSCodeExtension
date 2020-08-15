const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getWithHistoryPropertyValue, getTerminalWithHistoryProperty } = require('../../Properties/TerminalProperties/PostProperties/WithHistoryProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForWithHistorySet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("WithHistoryProperty", 
"withHistory", 
() => setCleanConfiguration("withHistory"), 
() => setDefaultConfiguration("withHistory"), 
getWithHistoryPropertyValue, 
getTerminalWithHistoryProperty, 
value => value ? ' -DwithHistory' : '', 
executeWhenForWithHistorySet);
