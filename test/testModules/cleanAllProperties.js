const { cleanProperties, setCleanConfiguration } = require('./setProperties');

const cleanAllProperties = () => {
    cleanProperties.forEach(property => {
        setCleanConfiguration(property); 
    });
}

module.exports = {
    cleanAllProperties,
}