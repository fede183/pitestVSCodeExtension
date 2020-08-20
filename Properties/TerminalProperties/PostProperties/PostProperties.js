const { getTerminalWithHistoryProperty } = require('./WithHistoryProperty');

const { getTerminalMutationThresholdProperty } = require('./MutationThresholdProperty');

const { getTerminalIncludeProperty } = require('./IncludeProperty');

const { getTerminalMutatorsProperty } = require('./MutatorsProperty');

const { getTerminalTimeoutConstantProperty } = require('./TimeoutConstantProperty');


const { getAllProperties } = require('../TerminalPropertiesCollectionExecution');

const getAllPostProperties = () => { 
    const listOfProperties = [getTerminalWithHistoryProperty, getTerminalMutationThresholdProperty, 
        getTerminalIncludeProperty, getTerminalMutatorsProperty, getTerminalTimeoutConstantProperty];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllPostProperties,
}