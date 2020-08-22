const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getSaveResultsPropertyValue, getTerminalSaveResultsProperty } = require('../../Properties/TerminalProperties/ResultProperties/SaveResultsProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

const configurationName = "saveResult";

getSimplePropertyTest("SaveResultProperty For Maven", 
configurationName, 
() => setCleanConfiguration(configurationName), 
() => setDefaultConfiguration(configurationName), 
getSaveResultsPropertyValue, 
getTerminalSaveResultsProperty, 
value => value ? ` > ${value}` : '', 
executeWhenForSaveResultSet);
