'use strict';

const getHistory = require('../../../src/controllers/get-history');
const fakeUpstream = require('../../../src/lib/fake-upstream');
const res = {
    sendStatus: jest.fn(),
    send: jest.fn()
};

jest.mock('../../../src/lib/fake-upstream');

describe('getHistory controller', () => {
    afterEach(() => {
       fakeUpstream.getCaptain.mockRestore();
       res.sendStatus.mockRestore();
       res.send.mockRestore();
    });
    test('it should return 404 if the captain doesnt exist', () => {
        fakeUpstream.getCaptain.mockReturnValue(undefined);
        getHistory({params: {captainName: 'Captain+Nobody'}}, res);
        expect(fakeUpstream.getCaptain).toBeCalledWith('Captain Nobody');
        expect(res.sendStatus).toBeCalledWith(404)
    });
    test('it should return the captain if the captain doesexist', () => {
        fakeUpstream.getCaptain.mockReturnValue({captainName: 'Captain Somebody', trips: []});
        getHistory({params: {captainName: 'Captain+Somebody'}}, res);
        expect(fakeUpstream.getCaptain).toBeCalledWith('Captain Somebody');
        expect(res.send).toBeCalledWith({captainName: 'Captain Somebody', trips: []})
    });
});