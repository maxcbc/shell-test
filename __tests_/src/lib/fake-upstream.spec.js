'use strict';

const {getCaptain} = require('../../../src/lib/fake-upstream');

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