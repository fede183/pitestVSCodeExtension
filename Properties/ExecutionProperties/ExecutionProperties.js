const { MavenExecutionProperty } = require('./MavenExecutionProperty');

const getAllProperties = () => { 
    const listOfProperties = [new MavenExecutionProperty()];
    
    return listOfProperties.map((property) => property.getTerminalProperty())
    .reduce((acumulator, actualProperty) => `${acumulator} ${actualProperty}`, "")
};
     
module.exports = {
    getAllProperties,
}