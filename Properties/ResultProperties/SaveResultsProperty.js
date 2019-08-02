const { getValue, getTerminalProperty } = require('../Property');

const getSaveResultsPropertyValue = () => {
    return getValue('saveResult', 'value');
}

const getTerminalSaveResultsProperty = () => {
    return getTerminalProperty('saveResult', 'value', 
        value => {
            const outPutFile = value;
            const terminalProperty = outPutFile ? `> ${outPutFile}` : '';
            return terminalProperty;
        }
    );
}

module.exports = {
    getSaveResultsPropertyValue,
    getTerminalSaveResultsProperty,
}