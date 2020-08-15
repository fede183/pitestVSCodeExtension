const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getSaveResultsPropertyValue, getTerminalSaveResultsProperty } = require('../../Properties/TerminalProperties/ResultProperties/SaveResultsProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForSaveResultSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("SaveResultProperty", 
"saveResult", 
() => setCleanConfiguration("saveResult"), 
() => setDefaultConfiguration("saveResult"), 
getSaveResultsPropertyValue, 
getTerminalSaveResultsProperty, 
value => value ? ` > ${value}` : '', 
executeWhenForSaveResultSet);
