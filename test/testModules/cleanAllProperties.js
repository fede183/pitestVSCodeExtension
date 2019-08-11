const { cleanOutputFileConfiguration, cleanMavenExecutionConfiguration, cleanWithHistoryConfiguration, 
    cleanMutationThresholdConfiguration, cleanIncludeConfiguration, cleanGoalConfiguration, cleanShowWebResultsConfiguration } = require('./setProperties');

const cleanAllProperties = () => {
    cleanOutputFileConfiguration();
	cleanMavenExecutionConfiguration();
    cleanWithHistoryConfiguration();
    cleanMutationThresholdConfiguration();
    cleanIncludeConfiguration();
    cleanGoalConfiguration();
    cleanShowWebResultsConfiguration();
}

module.exports = {
    cleanAllProperties,
}