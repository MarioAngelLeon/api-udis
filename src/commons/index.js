const { dateIntervals, getDayFromMoment } = require('./datemanipulation');
const { formatData } = require('./formatData');
const DBConnection = require('./DBConnection');


module.exports = { dateIntervals, getDayFromMoment, formatData, DBConnection }