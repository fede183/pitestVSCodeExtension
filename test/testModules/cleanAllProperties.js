const { cleanOutputFileConfiguration, cleanExecutionModeConfiguration, cleanMavenExecutionConfiguration,
    cleanCommandLineExecutionConfiguration, cleanWithHistoryConfiguration, cleanMutationThresholdConfiguration, 
    cleanIncludeConfiguration, cleanGoalConfiguration, cleanShowWebResultsConfiguration } = require('./setProperties');

const cleanAllProperties = () => {
    cleanOutputFileConfiguration();
    cleanExecutionModeConfiguration();
    cleanMavenExecutionConfiguration();
    cleanCommandLineExecutionConfiguration();
    cleanWithHistoryConfiguration();
    cleanMutationThresholdConfiguration();
    cleanIncludeConfiguration();
    cleanGoalConfiguration();
    cleanShowWebResultsConfiguration();
}

module.exports = {
    cleanAllProperties,
}