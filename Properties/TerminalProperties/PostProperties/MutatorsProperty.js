const { getValue, getTerminalProperty } = require('../../Property');

const getMutatorsPropertyValue = () => getValue('mutators', 'value');

const getMutators = (acumulator, value) => `${acumulator}${acumulator === "" ? "" : ","}${value}`

const getTerminalMutatorsProperty = () => 
        getTerminalProperty('mutators', 'value', 
            value => value && value.length > 0 ? ` -Dmutators=${value.reduce(getMutators, "")}` : '');

module.exports = {
    getMutatorsPropertyValue,
    getTerminalMutatorsProperty,
}