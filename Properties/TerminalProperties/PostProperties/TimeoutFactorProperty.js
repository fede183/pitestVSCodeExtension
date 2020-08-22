const { getValue } = require('../../Property');
const { getTerminalPropertyGeneric } = require('../../../test/testModules/getTerminalPropertyGeneric');

const getTimeoutFactorPropertyValue = () => getValue('timeoutFactor', 'value');

const getTerminalTimeoutFactorPropertyFunctionForMaven = value => value && value !== 1.25 ? value : '';

const getTerminalTimeoutFactorPropertyFunctionForJava = value => value && value !== 1.25 ? value : '';

const getTerminalTimeoutFactorProperty = () => 
getTerminalPropertyGeneric('timeoutFactor', 
getTerminalTimeoutFactorPropertyFunctionForMaven, 
getTerminalTimeoutFactorPropertyFunctionForJava);

module.exports = {
    getTimeoutFactorPropertyValue,
    getTerminalTimeoutFactorProperty,
}