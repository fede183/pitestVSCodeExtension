const { getSimplePropertyTest } = require('./simplePropertyTest');

const { getMavenExecutionPropertyValue, getTerminalMavenExecutionProperty } = require('../../Properties/TerminalProperties/ExecutionProperties/MavenExecutionProperty');

const { cleanMavenExecutionConfiguration, setMavenExecutionConfiguration } = require('../testModules/setProperties');

const { executeWhenForMavenExecutionSet } = require('../testModules/executeWhenModule');

getSimplePropertyTest("MavenExecutionProperty", "mavenExecution", cleanMavenExecutionConfiguration, setMavenExecutionConfiguration, 
getMavenExecutionPropertyValue, getTerminalMavenExecutionProperty, value => (value ? value + ".cmd" : "mvn") + " ", executeWhenForMavenExecutionSet);
