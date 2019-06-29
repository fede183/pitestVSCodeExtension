const { SaveResultsProperty } = require('./SaveResultsProperty');

const listOfProperties = [new SaveResultsProperty()];

const getAllProperties = () => listOfProperties.map((property) => property.getTerminalProperty())
    .reduce((acumulator, actualProperty) => `${acumulator} ${actualProperty}`, "");
     
module.exports = {
    getAllProperties,
}