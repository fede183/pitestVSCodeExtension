
const getAllProperties = (listOfProperties) => {       
    return listOfProperties.map((property) => property.getTerminalProperty())
    .reduce((acumulator, actualProperty) => `${acumulator} ${actualProperty}`, "")
};      


module.exports = {
    getAllProperties,
}