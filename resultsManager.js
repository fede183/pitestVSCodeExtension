const vscode = require('vscode');
const fs = require("fs");

const getLastReport = (reportDirectory) => {
    const reportsList = fs.readdirSync(reportDirectory);
    let reportsNumberList = reportsList.map(str => Number.parseInt(str));
    reportsNumberList = reportsNumberList.filter(report => 
        fs.existsSync(`${reportDirectory}/${report}/index.html`));

    const lastReport = Math.max(...reportsNumberList);
    
    return lastReport;
};

const showLinkResults = (workspaceFolder) => {
    const reportDirectory = `${workspaceFolder}/target/pit-reports`;
    const lastReport = getLastReport(reportDirectory);
    if(lastReport){
        vscode.window.showErrorMessage("Cannot read any report");
    }
    const directoryForLink = `${reportDirectory}/${lastReport}/index.html`;
    const fileContent = fs.readFileSync(directoryForLink, "utf8");

	const message = "PiTest report";		
    const column = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn : undefined;
            
    const panel = vscode.window.createWebviewPanel(
        "pitest", message,
        column || vscode.ViewColumn.One,
        {
            // Enable javascript in the webview
            enableScripts: true,
        }
    );

    panel.webview.html = fileContent;
};

module.exports = {
	showLinkResults,
}