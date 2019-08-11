const { getValue } = require('../Property');

const getShowWebResultsPropertyValue = () => {
    return getValue('showWebResults', 'value');
}

module.exports = {
    getShowWebResultsPropertyValue,
}