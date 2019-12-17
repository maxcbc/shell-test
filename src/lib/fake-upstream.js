'use strict';

const CAPTAINS = ["Patsy Stone"];
const JOURNEYS = [
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
    if (CAPTAINS.includes(name)) {
        return {
            captainName: name,
            trips: JOURNEYS
                .filter(trip => trip.captain === name)
                .map(({vessel, from, to, fromDate, toDate}) => ({vessel, from, to, fromDate, toDate}))
        }
    }
};
