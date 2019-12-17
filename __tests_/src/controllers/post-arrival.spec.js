'use strict';

const postArrival = require('../../../src/controllers/post-arrival');
const fakeUpstream = require('../../../src/lib/fake-upstream');
const next = jest.fn();
const res = {
    sendStatus: jest.fn()
};

jest.mock('../../../src/lib/fake-upstream');

const MOCK_BODY = {
    captain: 'Patsy+Stone',
    vessel: 'El Tauro',
    datetime: '5th of Feb 2056',
    port: 'Singapore'
};

describe('getHistory controller', () => {
    afterEach(() => {
       fakeUpstream.addArrival.mockRestore();
       res.sendStatus.mockRestore();
    });
    test.each([
        'Bad date format',
        'Date too early',
        'Missing Properties'
    ])('it should return 400 if the upstream function throws a \'%s\' error', (errorMessage) => {
        fakeUpstream.addArrival.mockImplementation(() => {
            throw new Error(errorMessage);
        });
        postArrival({body: MOCK_BODY}, res, next);
        expect(fakeUpstream.addArrival).toBeCalledWith({...MOCK_BODY, captain: 'Patsy Stone'});
        expect(res.sendStatus).toBeCalledWith(400)
    });

    test.each([
        'Captain not Found',
        'Vessel not Found'
    ])('it should return 400 if the upstream function throws a \'%s\' error', (errorMessage) => {
        fakeUpstream.addArrival.mockImplementation(() => {
            throw new Error(errorMessage);
        });
        postArrival({body: MOCK_BODY}, res, next);
        expect(fakeUpstream.addArrival).toBeCalledWith({...MOCK_BODY, captain: 'Patsy Stone'});
        expect(res.sendStatus).toBeCalledWith(404)
    });

    test('it should pass the errornext if the upstream function throws an unknown error', () => {
        fakeUpstream.addArrival.mockImplementation(() => {
            throw new Error('You sunk my battleship');
        });
        postArrival({body: MOCK_BODY}, res, next);
        expect(fakeUpstream.addArrival).toBeCalledWith({...MOCK_BODY, captain: 'Patsy Stone'});
        expect(next).toBeCalledWith(new Error('You sunk my battleship'))
    });

    test('it should return 201 if the upstream function returns succesfully', () => {
        fakeUpstream.addArrival.mockReturnValue(true);
        postArrival({body: MOCK_BODY}, res, next);
        expect(fakeUpstream.addArrival).toBeCalledWith({...MOCK_BODY, captain: 'Patsy Stone'});
        expect(res.sendStatus).toBeCalledWith(201)
    });
});