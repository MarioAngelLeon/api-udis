const { getDayFromMoment, dateIntervals } = require('../commons');

test('Should get the day from the current date', () => {

    const day = getDayFromMoment();

    //expect( day ).toBe(29);

    expect( day ).not.toBe(undefined)

});

test('Should yield two date ranges', () => {

    const periods = dateIntervals(25);

    const keys = Object.keys(periods);

    expect( keys ).toEqual(['initPeriod', 'endPeriod'])

});