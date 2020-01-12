const { getTerminalWithHistoryProperty } = require('./WithHistoryProperty');

const { getTerminalMutationThresholdProperty } = require('./MutationThresholdProperty');

const { getTerminalIncludeProperty } = require('./IncludeProperty');

const { getAllProperties } = require('../TerminalPropertiesCollectionExecution');

const getAllPostProperties = () => { 
    const listOfProperties = [getTerminalWithHistoryProperty, getTerminalMutationThresholdProperty, 
        getTerminalIncludeProperty];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllPostProperties,
}