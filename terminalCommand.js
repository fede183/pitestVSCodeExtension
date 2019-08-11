const { getAllPostProperties } = require('./Properties/TerminalProperties/PostProperties/PostProperties');
const { getTerminalGoalProperty } = require('./Properties/TerminalProperties/GoalProperties/GoalProperty');
const { getAllResultsProperties } = require('./Properties/TerminalProperties/ResultProperties/ResultsProperties');
const { getAllExecutionProperties } = require('./Properties/TerminalProperties/ExecutionProperties/ExecutionProperties');

const mutationCommand = () => getAllExecutionProperties() + getTerminalGoalProperty() + 
getAllPostProperties() + getAllResultsProperties();

module.exports = {
	mutationCommand,
}
