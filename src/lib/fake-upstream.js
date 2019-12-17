'use strict';

const moment = require('moment');

const CAPTAINS = ["Patsy Stone"];
const JOURNEYS = exports.JOURNEYS = [
    {
        captain: "Patsy Stone",
        vessel: 'El Tauro',
        from: 'Singapore',
        to: 'Melbourne',
        fromDate: 1514764800000,
        toDate: 1515888000000
    }
];

exports.getCaptain = (name) => {
    if (!name) return;
    if (CAPTAINS.find(captain => captain.toLowerCase() === name.toLowerCase())) {
        return {
            captainName: name,
            trips: JOURNEYS
                .filter(trip => trip.captain.toLowerCase() === name.toLowerCase())
                .map(({vessel, from, to, fromDate, toDate}) => ({vessel, from, to, fromDate, toDate}))
        }
    }
};

exports.addArrival = ({captain: captainName, vessel, datetime, port} = {}) => {
    if (!CAPTAINS.find(captain => captain.toLowerCase() === captainName.toLowerCase())) throw new Error('Captain not Found');
    if ([vessel, datetime, port].includes(undefined)) throw new Error('Missing Properties');

    // Parse Datetime
    const parsedDateTime = moment(datetime, 'Do [of] MMM YYYY');
    if (parsedDateTime.format('Do [of] MMM YYYY') !== datetime) throw new Error('Bad date format');

    // Get Previous Journey for Vessel
    const js = JOURNEYS.filter((j) => vessel === j.vessel).sort((a, b) => b.toDate - a.toDate);
    const [previousJourney] = js;
    if (!previousJourney) throw new Error('Vessel not Found');
    if (previousJourney.toDate >= parsedDateTime.unix() * 1000) throw new Error('Date too early');


    const journey = {
        captain: CAPTAINS.find(captain => captain.toLowerCase() === captainName.toLowerCase()),
        vessel,
        from: previousJourney.to,
        to: port,
        fromDate: previousJourney.toDate,
        toDate: moment(datetime, 'Do [of] MMM YYYY').unix() * 1000
    };

    JOURNEYS.push(journey);
    return true
};