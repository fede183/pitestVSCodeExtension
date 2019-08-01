const { getTerminalSaveResultsProperty } = require('./SaveResultsProperty');

const { getAllProperties } = require('../PropertiesCollectionExecution');

const getAllResultsProperties = () => { 
    const listOfProperties = [getTerminalSaveResultsProperty];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllResultsProperties,
}