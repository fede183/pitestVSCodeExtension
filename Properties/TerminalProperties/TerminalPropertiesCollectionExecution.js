
const getAllProperties = (listOfProperties) =>      
    listOfProperties.map((property) => property())
        .reduce((acumulator, actualProperty) => 
            `${acumulator}${acumulator === "" || actualProperty === "" ? 
                "" : " "}${actualProperty}`, "");      

module.exports = {
    getAllProperties,
}