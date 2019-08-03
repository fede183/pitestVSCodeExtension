const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getSaveResultsPropertyValue, getTerminalSaveResultsProperty } = require('../../Properties/ResultProperties/SaveResultsProperty');

const { cleanOutputFileConfiguration, setOutputFileConfiguration } = require('../testModules/setProperties');

const { executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("SaveResultProperty", "saveResult", cleanOutputFileConfiguration, setOutputFileConfiguration, 
getSaveResultsPropertyValue, getTerminalSaveResultsProperty, value => value ? ` > ${value}` : '', executeWhenForSaveResultSet);

