const { getTerminalWithHistoryProperty } = require('./WithHistoryProperty');

const { getAllProperties } = require('../PropertiesCollectionExecution');

const getAllPostProperties = () => { 
    const listOfProperties = [getTerminalWithHistoryProperty];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllPostProperties,
}