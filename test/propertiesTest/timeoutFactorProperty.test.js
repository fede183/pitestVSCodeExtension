const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getTimeoutFactorPropertyValue, getTerminalTimeoutFactorProperty, getTerminalTimeoutFactorPropertyFunctionForMaven } = require('../../Properties/TerminalProperties/PostProperties/TimeoutFactorProperty');

const { setDefaultConfiguration, setCleanConfiguration } = require('../testModules/setProperties');

const { executeWhenForTimeoutFactorSet } = require('../testModules/executeWhenModule');

const configurationName = "timeoutFactor";

getSimplePropertyTest("TimeoutFactorProperty for Maven", 
configurationName, 
() => setCleanConfiguration(configurationName), 
() => setDefaultConfiguration(configurationName), 
getTimeoutFactorPropertyValue, 
getTerminalTimeoutFactorProperty, 
getTerminalTimeoutFactorPropertyFunctionForMaven, 
executeWhenForTimeoutFactorSet);
