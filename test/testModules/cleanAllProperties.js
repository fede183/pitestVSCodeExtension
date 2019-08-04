const { cleanOutputFileConfiguration, cleanMavenExecutionConfiguration, cleanWithHistoryConfiguration, 
    cleanMutationThresholdConfiguration, cleanIncludeConfiguration, cleanGoalConfiguration } = require('./setProperties');

const cleanAllProperties = () => {
    cleanOutputFileConfiguration();
	cleanMavenExecutionConfiguration();
    cleanWithHistoryConfiguration();
    cleanMutationThresholdConfiguration();
    cleanIncludeConfiguration();
    cleanGoalConfiguration();
}

module.exports = {
    cleanAllProperties,
}