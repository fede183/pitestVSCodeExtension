const { cleanOutputFileConfiguration, cleanMavenExecutionConfiguration, cleanWithHistoryConfiguration, 
    cleanMutationThresholdConfiguration, cleanIncludeConfiguration } = require('./setProperties');

const cleanAllProperties = () => {
    cleanOutputFileConfiguration();
	cleanMavenExecutionConfiguration();
    cleanWithHistoryConfiguration();
    cleanMutationThresholdConfiguration();
    cleanIncludeConfiguration();
}

module.exports = {
    cleanAllProperties,
}