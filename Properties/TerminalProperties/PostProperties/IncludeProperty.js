const { getValue, getTerminalProperty } = require('../../Property');
const { getListPropertyTerminal } = require('../../../test/testModules/constructListProperty');

const getIncludePropertyValue = () => getValue('include', 'value');

const getTerminalIncludePropertyFunctionForMaven = value => value && value.length > 0 ? ` -Dinclude=${getListPropertyTerminal(value)}` : '';

const getTerminalIncludeProperty = () => 
    getTerminalProperty('include', 'value', getTerminalIncludePropertyFunctionForMaven);

module.exports = {
    getIncludePropertyValue,
    getTerminalIncludeProperty,
    getTerminalIncludePropertyFunctionForMaven,
}