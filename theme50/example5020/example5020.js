const path = require('path');

const { logLineAsync } = require('../../utils/utils');

const logFN = path.join(__dirname, '_example.log');

logLineAsync(logFN,"example5020 executed!");
