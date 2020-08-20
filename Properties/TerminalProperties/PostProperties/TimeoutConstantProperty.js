const { getValue, getTerminalProperty } = require('../../Property');

const getTimeoutConstantPropertyValue = () => getValue('timeoutConstant', 'value');

const getTerminalTimeoutConstantProperty = () => 
getTerminalProperty('timeoutConstant', 'value', 
    value => value && value !== 4000  ? ` -DtimeoutConstant=${value}` : '');

module.exports = {
    getTimeoutConstantPropertyValue,
    getTerminalTimeoutConstantProperty,
}