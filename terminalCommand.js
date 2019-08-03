const { getAllPostProperties } = require('./Properties/PostProperties/PostProperties');
const { getAllResultsProperties } = require('./Properties/ResultProperties/ResultsProperties');
const { getAllExecutionProperties } = require('./Properties/ExecutionProperties/ExecutionProperties');

const mutationCommand = () => (getAllExecutionProperties() + 'org.pitest:pitest-maven:mutationCoverage' + getAllPostProperties() + getAllResultsProperties());

module.exports = {
	mutationCommand,
}
