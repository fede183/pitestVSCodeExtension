const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMutatorsPropertyValue, getTerminalMutatorsProperty } = require('../../Properties/TerminalProperties/PostProperties/MutatorsProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForMutatorsSet } = require('../testModules/executeWhenModule');

const getMurators = (acumulator, value) => `${acumulator}${acumulator === "" ? "" : ","}${value}`

const configurationPropery = "mutators";

getSimplePropertyTest("MutatorsProperty", 
configurationPropery, 
() => setCleanConfiguration(configurationPropery), 
() => setDefaultConfiguration(configurationPropery), 
getMutatorsPropertyValue, 
getTerminalMutatorsProperty, 
value => value && value.length > 0 ? 
    ` -Dmutators=${value.reduce(getMurators, "") }` : 
    '', 
executeWhenForMutatorsSet);
