
const getAllProperties = (listOfProperties) => {       
    return listOfProperties.map((property) => property())
    .reduce((acumulator, actualProperty) => `${acumulator} ${actualProperty}`, "")
};      

module.exports = {
    getAllProperties,
}