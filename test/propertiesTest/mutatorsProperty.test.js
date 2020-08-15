const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMutatorsPropertyValue, getTerminalMutatorsProperty } = require('../../Properties/TerminalProperties/PostProperties/MutatorsProperty');

const { cleanMutatorsConfiguration, setMutatorsConfiguration } = require('../testModules/setProperties');

const { executeWhenForMutatorsSet } = require('../testModules/executeWhenModule');

const getMurators = (acumulator, value) => `${acumulator}${acumulator === "" ? "" : ","}${value}`

getSimplePropertyTest("MutatorsProperty", 
"mutators", 
cleanMutatorsConfiguration, 
setMutatorsConfiguration, 
getMutatorsPropertyValue, 
getTerminalMutatorsProperty, 
value => value && value.length > 0 ? 
    ` -Dmutators=${value.reduce(getMurators, "") }` : 
    '', 
executeWhenForMutatorsSet);
