const { getTerminalMavenExecutionProperty } = require('./MavenExecutionProperty');

const { getAllProperties } = require('../TerminalPropertiesCollectionExecution');

const getAllExecutionProperties = () => { 
    const listOfProperties = [getTerminalMavenExecutionProperty];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllExecutionProperties,
}