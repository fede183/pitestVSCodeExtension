// You can import and use all API from the 'vscode' module
// as well as import your extension to test it

const executeWhenConditionIsReach = (condition, program) => {
	var delInterval = setInterval(checkConditionIsReach, 1000);
	function checkConditionIsReach() {
		if (condition()) {
			clearInterval(delInterval);
			program();
		}
	}
};

module.exports = {
	executeWhenConditionIsReach,
}