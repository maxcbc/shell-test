'use strict';

const {getCaptain, addArrival, JOURNEYS} = require('../../../src/lib/fake-upstream');

describe('get captain', () => {
    test('it should return undefined if the captain does not exist', () => {
        expect(getCaptain('Captain America')).toBeUndefined()
    });
    describe('when the captain exists in the exact form provided', () => {
        let result;
        beforeAll(() => {
            result = getCaptain('Patsy Stone')
        });
        test('it should return a captain object', () => {
            expect(result).not.toBeUndefined();
        });
        test('the captain object should include the captains name', () => {
            expect(result).toHaveProperty('captainName', 'Patsy Stone')
        });
        test('the captain object should include the journeys for that captain', () => {
            expect(result).toHaveProperty('trips');
            expect(result.trips).toEqual([
                {
                    vessel: 'El Tauro',
                    from: 'Singapore',
                    to: 'Melbourne',
                    fromDate: 1514764800000,
                    toDate: 1515888000000
                }
            ])
        })
    });
    test('it should fetch the captain in a case insensitive way', () => {
        expect(getCaptain('patsy stone')).not.toBeUndefined();
        expect(getCaptain('pAtsy stone')).not.toBeUndefined();
        expect(getCaptain('patsy stOne')).not.toBeUndefined();
        expect(getCaptain('patsY sTone')).not.toBeUndefined();
    })
});

describe('add arrival', () => {
    test('it should throw an error if the captain does not exist', () => {
        let err;
        try {
            addArrival({
                captain: 'Captain America',
                vessel: 'El Tauro',
                datetime: '5th of Feb 2056',
                port: 'Singapore'})
        } catch(e) {
            err = e
        }
        expect(err).toHaveProperty('message', 'Captain not Found')
    });
    test('it should throw if the journey is missing properties', () => {
        let err;
        try {
            addArrival({
                captain: 'Patsy Stone',
                vessel: 'El Tauro',
                datetime: '5th of Feb 2056'
            })
        } catch(e) {
            err = e
        }
        expect(err).toHaveProperty('message', 'Missing Properties')
    });
    test('it should throw if the vessel has no previous history', () => {
        let err;
        try {
            addArrival({
                captain: 'Patsy Stone',
                vessel: 'SS Penguin',
                datetime: '5th of Feb 2056',
                port: 'Singapore'
            })
        } catch(e) {
            err = e
        }
        expect(err).toHaveProperty('message', 'Vessel not Found')
    });
    test('it should throw if the datetime is not in the expected format', () => {
        let err;
        try {
            addArrival({
                captain: 'Patsy Stone',
                vessel: 'El Tauro',
                datetime: '2056/02/05',
                port: 'Singapore'
            })
        } catch(e) {
            err = e
        }
        expect(err).toHaveProperty('message', 'Bad date format')
    });
    test('it should throw if the datetime is before the last reported date for the vessel', () => {
        let err;
        try {
            addArrival({
                captain: 'Patsy Stone',
                vessel: 'El Tauro',
                datetime: '5th of Feb 2000',
                port: 'Singapore'
            })
        } catch(e) {
            err = e
        }
        expect(err).toHaveProperty('message', 'Date too early')
    });
    describe('when the captain exists and the journey is correctly formatted', () => {
        let result;
        beforeAll(() => {
            result = addArrival({
                captain: 'Patsy Stone',
                vessel: 'El Tauro',
                datetime: '5th of Feb 2056',
                port: 'Singapore'
            })
        });
        test('it should return true', () => {
            expect(result).toEqual(true)
        });
        test('it adds a journey to the journey\'s array with the fromDate being the vessel\'s last arrival in a port', () => {
            expect(JOURNEYS).toContainEqual({
                captain: 'Patsy Stone',
                vessel: 'El Tauro',
                from: 'Melbourne',
                to: 'Singapore',
                fromDate: 1515888000000,
                toDate: 2716934400000
            })
        })
    });
});