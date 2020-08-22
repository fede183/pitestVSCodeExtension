const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getIncludePropertyValue, getTerminalIncludeProperty, getTerminalIncludePropertyFunctionForMaven } = require('../../Properties/TerminalProperties/PostProperties/IncludeProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForIncludeSet } = require('../testModules/executeWhenModule');

const configurationName = "include";

getSimplePropertyTest("IncludeProperty", 
configurationName, 
() => setCleanConfiguration(configurationName), 
() => setDefaultConfiguration(configurationName), 
getIncludePropertyValue, 
getTerminalIncludeProperty, 
getTerminalIncludePropertyFunctionForMaven, 
executeWhenForIncludeSet);
