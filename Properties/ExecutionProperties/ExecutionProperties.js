const { getTerminalMavenExecutionProperty } = require('./MavenExecutionProperty');

const { getAllProperties } = require('../PropertiesCollectionExecution');

const getAllExecutionProperties = () => { 
    const listOfProperties = [getTerminalMavenExecutionProperty];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllExecutionProperties,
}