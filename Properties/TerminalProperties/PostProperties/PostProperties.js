const { getTerminalWithHistoryProperty } = require('./WithHistoryProperty');

const { getTerminalMutationThresholdProperty } = require('./MutationThresholdProperty');

const { getTerminalIncludeProperty } = require('./IncludeProperty');

const { getTerminalMutatorsProperty } = require('./MutatorsProperty');

const { getAllProperties } = require('../TerminalPropertiesCollectionExecution');

const getAllPostProperties = () => { 
    const listOfProperties = [getTerminalWithHistoryProperty, getTerminalMutationThresholdProperty, 
        getTerminalIncludeProperty, getTerminalMutatorsProperty];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllPostProperties,
}