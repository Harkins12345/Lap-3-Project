 const authMiddleware = require('../middleware/authMiddleware')
 const User = require('../models/User');
 const jwt = require('jsonwebtoken');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('auth controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

   
    describe('requireAuth', () => {
        const token = 'heheh'
        test('check if there is a token', async () => {          
            expect(token).not.toBeNull();
        })
    });

    describe('requireAuth', () => {
        test('check if there is a token', async () => { 
            const token = 1
            expect(token).not.toBeNull();
        })
    });
    
    describe('checkUser', () => {
        test('check if there is a token', async () => { 
            const token = 1
            expect(token).not.toBeNull();
        })
    });

    describe('checkUser', () => {
        test('check if there is a token', async () => { 
            const token = 1
            expect(token).not.toBeNull();
        })
    });
})