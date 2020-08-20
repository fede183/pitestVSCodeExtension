const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getSaveResultsPropertyValue, getTerminalSaveResultsProperty } = require('../../Properties/TerminalProperties/ResultProperties/SaveResultsProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

const configurationPropery = "saveResult";

getSimplePropertyTest("SaveResultProperty For Maven", 
configurationPropery, 
() => setCleanConfiguration(configurationPropery), 
() => setDefaultConfiguration(configurationPropery), 
getSaveResultsPropertyValue, 
getTerminalSaveResultsProperty, 
value => value ? ` > ${value}` : '', 
executeWhenForSaveResultSet);
