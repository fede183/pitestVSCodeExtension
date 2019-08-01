const { SaveResultsProperty } = require('./SaveResultsProperty');

const { getAllProperties } = require('../PropertiesCollectionExecution');

const getAllResultsProperties = () => { 
    const listOfProperties = [new SaveResultsProperty()];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllResultsProperties,
}