const { getValue, getTerminalProperty } = require('../Property');

const getIncludePropertyValue = () => getValue('include', 'value');

const getInclude = (acumulator, value) => `${acumulator}${acumulator === "" ? "" : ","}${value}`

const getTerminalIncludeProperty = () => getTerminalProperty('include', 'value', value => value && value.length > 0 ? ` -Dinclude=${value.reduce(getInclude, "")}` : '');

module.exports = {
    getIncludePropertyValue,
    getTerminalIncludeProperty,
}