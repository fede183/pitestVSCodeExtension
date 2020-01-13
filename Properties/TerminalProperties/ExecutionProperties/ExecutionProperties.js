const { getTerminalExecutionProperty } = require('./ExecutionProperty');

const { getAllProperties } = require('../TerminalPropertiesCollectionExecution');

const getAllExecutionProperties = () => { 
    const listOfProperties = [getTerminalExecutionProperty];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllExecutionProperties,
}