const getListPropertyTerminalReduceFunction = (acumulator, value) => 
`${acumulator}${acumulator === "" ? "" : ","}${value}`

const getListPropertyTerminal = (value) => value.reduce(getListPropertyTerminalReduceFunction, "");

module.exports = {
    getListPropertyTerminal,
}