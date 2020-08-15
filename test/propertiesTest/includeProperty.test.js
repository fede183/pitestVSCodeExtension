const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getIncludePropertyValue, getTerminalIncludeProperty } = require('../../Properties/TerminalProperties/PostProperties/IncludeProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForIncludeSet } = require('../testModules/executeWhenModule');

const getInclude = (acumulator, value) => `${acumulator}${acumulator === "" ? "" : ","}${value}`

getSimplePropertyTest("IncludeProperty", 
"include", 
() => setCleanConfiguration("include"), 
() => setDefaultConfiguration("include"), 
getIncludePropertyValue, 
getTerminalIncludeProperty, 
value => value && value.length > 0 ? 
    ` -Dinclude=${value.reduce(getInclude, "") }` : 
    '', 
executeWhenForIncludeSet);
