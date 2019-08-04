const { getValue, getTerminalProperty } = require('../Property');

const getWithHistoryPropertyValue = () => getValue('withHistory', 'value');

const getTerminalWithHistoryProperty = () => getTerminalProperty('withHistory', 'value', value => value ? ' -DwithHistory' : '');

module.exports = {
    getWithHistoryPropertyValue,
    getTerminalWithHistoryProperty,
}