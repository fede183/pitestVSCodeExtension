const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMutatorsPropertyValue, getTerminalMutatorsProperty } = require('../../Properties/TerminalProperties/PostProperties/MutatorsProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForMutatorsSet } = require('../testModules/executeWhenModule');

const getMurators = (acumulator, value) => `${acumulator}${acumulator === "" ? "" : ","}${value}`

getSimplePropertyTest("MutatorsProperty", 
"mutators", 
() => setCleanConfiguration("mutators"), 
() => setDefaultConfiguration("mutators"), 
getMutatorsPropertyValue, 
getTerminalMutatorsProperty, 
value => value && value.length > 0 ? 
    ` -Dmutators=${value.reduce(getMurators, "") }` : 
    '', 
executeWhenForMutatorsSet);
