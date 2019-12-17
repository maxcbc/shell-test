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
