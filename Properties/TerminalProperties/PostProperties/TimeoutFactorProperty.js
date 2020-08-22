const { getValue, getTerminalProperty } = require('../../Property');

const getTimeoutFactorPropertyValue = () => getValue('timeoutFactor', 'value');

const getTerminalTimeoutFactorPropertyFunctionForMaven = value => value && value !== 1.25 ? ` -DtimeoutFactor=${value}` : '';

const getTerminalTimeoutFactorProperty = () => 
getTerminalProperty('timeoutFactor', 'value', getTerminalTimeoutFactorPropertyFunctionForMaven);

module.exports = {
    getTimeoutFactorPropertyValue,
    getTerminalTimeoutFactorProperty,
    getTerminalTimeoutFactorPropertyFunctionForMaven,
}