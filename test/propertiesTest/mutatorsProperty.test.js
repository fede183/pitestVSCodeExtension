const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMutatorsPropertyValue, getTerminalMutatorsProperty, getTerminalMutatorsPropertyFunctionForMaven } = require('../../Properties/TerminalProperties/PostProperties/MutatorsProperty');

const { setCleanConfiguration, setDefaultConfiguration } = require('../testModules/setProperties');

const { executeWhenForMutatorsSet } = require('../testModules/executeWhenModule');

const configurationPropery = "mutators";

getSimplePropertyTest("MutatorsProperty", 
configurationPropery, 
() => setCleanConfiguration(configurationPropery), 
() => setDefaultConfiguration(configurationPropery), 
getMutatorsPropertyValue, 
getTerminalMutatorsProperty, 
getTerminalMutatorsPropertyFunctionForMaven, 
executeWhenForMutatorsSet);
