'use strict';

const {getCaptain} = require('../../../src/lib/fake-upstream');

describe('get captain', () => {
    test('it should return undefined if the captain does not exist', () => {
        expect(getCaptain('Captain America')).toBeUndefined()
    });
    describe('when the captain exists', () => {
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
});