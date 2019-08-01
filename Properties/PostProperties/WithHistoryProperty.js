const { getValue, getTerminalProperty } = require('../Property');

const getWithHistoryPropertyValue = () => {
    return getValue('withHistory', 'value');
}

const getTerminalWithHistoryProperty = () => {
    return getTerminalProperty('withHistory', 'value', value => value ? '-DwithHistory' : '');
}

module.exports = {
    getWithHistoryPropertyValue,
    getTerminalWithHistoryProperty,
}