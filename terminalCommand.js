const { getAllPostProperties } = require('./Properties/PostProperties/PostProperties');
const { getTerminalGoalProperty } = require('./Properties/GoalProperties/GoalProperty');
const { getAllResultsProperties } = require('./Properties/ResultProperties/ResultsProperties');
const { getAllExecutionProperties } = require('./Properties/ExecutionProperties/ExecutionProperties');

const mutationCommand = () => getAllExecutionProperties() + getTerminalGoalProperty() + 
getAllPostProperties() + getAllResultsProperties();

module.exports = {
	mutationCommand,
}
