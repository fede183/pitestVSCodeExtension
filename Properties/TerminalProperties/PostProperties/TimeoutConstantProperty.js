const { getValue, getTerminalProperty } = require('../../Property');

const getTimeoutConstantPropertyValue = () => getValue('timeoutConstant', 'value');

const getTerminalTimeoutConstantPropertyFunctionForMaven = value => value && value !== 4000 ? ` -DtimeoutConstant=${value}` : '';

const getTerminalTimeoutConstantProperty = () => 
getTerminalProperty('timeoutConstant', 'value', getTerminalTimeoutConstantPropertyFunctionForMaven);

module.exports = {
    getTimeoutConstantPropertyValue,
    getTerminalTimeoutConstantProperty,
    getTerminalTimeoutConstantPropertyFunctionForMaven,
}