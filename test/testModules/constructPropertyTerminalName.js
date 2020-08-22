const constructPropertyTerminalName = (mode, name) => name ? 
`${mode === "Maven" ? '-D' : '--'}${name}` : "";

module.exports = {
    constructPropertyTerminalName,
}