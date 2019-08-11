const { getTerminalSaveResultsProperty } = require('./SaveResultsProperty');

const { getAllProperties } = require('../TerminalPropertiesCollectionExecution');

const getAllResultsProperties = () => { 
    const listOfProperties = [getTerminalSaveResultsProperty];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllResultsProperties,
}