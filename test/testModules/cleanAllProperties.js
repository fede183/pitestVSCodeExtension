const { cleanOutputFileConfiguration, cleanMavenExecutionConfiguration, cleanWithHistoryConfiguration, cleanMutationThresholdConfiguration } = require('./setProperties');

const cleanAllProperties = () => {
    cleanOutputFileConfiguration();
	cleanMavenExecutionConfiguration();
    cleanWithHistoryConfiguration();
    cleanMutationThresholdConfiguration();
}

module.exports = {
    cleanAllProperties,
}