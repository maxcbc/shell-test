'use strict';

let middleware;
const res = {
    sendStatus: jest.fn()
};
const next = jest.fn();
const clearMocks = () => {
    res.sendStatus.mockRestore();
    next.mockRestore();
};

describe('apiKeyMiddleWare', () => {
   describe('when no api key is set', () => {
       beforeAll(() => {
           delete process.env.API_KEY;
           jest.isolateModules(() => {
               middleware = require('../../../src/middleware/api-key');
           });
           middleware({get: () => 'VALID KEY'}, res, next)
       });
       afterAll(clearMocks);
       test('it should respond unauthorized', () => {
           expect(res.sendStatus).toBeCalledWith(401);
       })
   });
    describe('when api key is set but the supplied api key is invalid', () => {
        beforeAll(() => {
            process.env.API_KEY = 'VALID KEY';
            jest.isolateModules(() => {
                middleware = require('../../../src/middleware/api-key');
            });
            middleware({get: () => 'INVALID KEY'}, res, next)
        });
        afterAll(clearMocks);
        test('it should respond unauthorized', () => {
            expect(res.sendStatus).toBeCalledWith(401);
        })
    });
    describe('when api key is set and the supplied api key is valid', () => {
        beforeAll(() => {
            process.env.API_KEY = 'VALID KEY';
            jest.isolateModules(() => {
                middleware = require('../../../src/middleware/api-key');
            });
            middleware({get: () => 'VALID KEY'}, res, next)
        });
        afterAll(clearMocks);
        test('it should call next', () => {
            expect(next).toBeCalled();
        })
    })
});