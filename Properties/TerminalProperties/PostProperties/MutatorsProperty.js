const { getValue, getTerminalProperty } = require('../../Property');
const { getListPropertyTerminal } = require('../../../test/testModules/constructListProperty');

const getMutatorsPropertyValue = () => getValue('mutators', 'value');

const getTerminalMutatorsPropertyFunctionForMaven = value => value && value.length > 0 ? ` -Dmutators=${getListPropertyTerminal(value)}` : ''; 

const getTerminalMutatorsProperty = () => 
        getTerminalProperty('mutators', 'value', getTerminalMutatorsPropertyFunctionForMaven);

module.exports = {
    getMutatorsPropertyValue,
    getTerminalMutatorsProperty,
    getTerminalMutatorsPropertyFunctionForMaven,
}