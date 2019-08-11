const { getValue, getTerminalProperty } = require('../../Property');

const getSaveResultsPropertyValue = () => getValue('saveResult', 'value');

const getTerminalSaveResultsProperty = () => getTerminalProperty('saveResult', 'value', 
        value => {
            const outPutFile = value;
            const terminalProperty = outPutFile ? ` > ${outPutFile}` : '';
            return terminalProperty;
        }
    );

module.exports = {
    getSaveResultsPropertyValue,
    getTerminalSaveResultsProperty,
}