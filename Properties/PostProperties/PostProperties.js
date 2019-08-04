const { getTerminalWithHistoryProperty } = require('./WithHistoryProperty');

const { getTerminalMutationThresholdProperty } = require('./MutationThresholdProperty');

const { getAllProperties } = require('../PropertiesCollectionExecution');

const getAllPostProperties = () => { 
    const listOfProperties = [getTerminalWithHistoryProperty, getTerminalMutationThresholdProperty];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllPostProperties,
}