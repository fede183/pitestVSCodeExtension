const { MavenExecutionProperty } = require('./MavenExecutionProperty');

const { getAllProperties } = require('../PropertiesCollectionExecution');

const getAllExecutionProperties = () => { 
    const listOfProperties = [new MavenExecutionProperty()];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllExecutionProperties,
}