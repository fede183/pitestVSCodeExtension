const { SaveResultsProperty } = require('./SaveResultsProperty');

const getAllProperties = () => { 
    const listOfProperties = [new SaveResultsProperty()];
    
    return listOfProperties.map((property) => property.getTerminalProperty())
    .reduce((acumulator, actualProperty) => `${acumulator} ${actualProperty}`, "")
};
     
module.exports = {
    getAllProperties,
}