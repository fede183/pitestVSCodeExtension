const vscode = require('vscode');

const getValue = (configName, valueName) => {
    const config = vscode.workspace.getConfiguration(configName);
    const value = config.get(valueName);

    return value;
}

const getTerminalProperty = (configName, valueName, terminalPropertyFunction) => terminalPropertyFunction(getValue(configName, valueName));

module.exports = {
    getValue,
    getTerminalProperty,
}