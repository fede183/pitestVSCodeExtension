const defaultTimeout = 100000;

/**
 * @param {number} timeout
 */
const timeoutToStringTime = (timeout) => (timeout/1000) + 's';

const defaultTestTimeout = timeoutToStringTime(defaultTimeout);

module.exports = {
	defaultTestTimeout,
}