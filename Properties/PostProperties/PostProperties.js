const { WithHistoryProperty } = require('./WithHistoryProperty');

const { getAllProperties } = require('../PropertiesCollectionExecution');

const getAllPostProperties = () => { 
    const listOfProperties = [new WithHistoryProperty()];
        
    return getAllProperties(listOfProperties);
};      

module.exports = {
    getAllPostProperties,
}