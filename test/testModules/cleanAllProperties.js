const { cleanOutputFileConfiguration, cleanMavenExecutionConfiguration, cleanWithHistoryConfiguration } = require('./setProperties');

const cleanAllProperties = () => {
    cleanOutputFileConfiguration();
	cleanMavenExecutionConfiguration();
	cleanWithHistoryConfiguration();
}

module.exports = {
    cleanAllProperties,
}