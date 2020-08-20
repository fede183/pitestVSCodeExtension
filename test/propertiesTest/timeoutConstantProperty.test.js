const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getTimeoutConstantPropertyValue, getTerminalTimeoutConstantProperty } = require('../../Properties/TerminalProperties/PostProperties/TimeoutConstantProperty');

const { setDefaultConfiguration, setCleanConfiguration } = require('../testModules/setProperties');

const { executeWhenForTimeoutConstantSet } = require('../testModules/executeWhenModule');

const configurationName = "timeoutConstant";

getSimplePropertyTest("TimeoutConstantProperty for Maven", 
configurationName, 
() => setCleanConfiguration(configurationName), 
() => setDefaultConfiguration(configurationName), 
getTimeoutConstantPropertyValue, 
getTerminalTimeoutConstantProperty, 
value => value ? ` -DtimeoutConstant=${value}` : '', 
executeWhenForTimeoutConstantSet);
