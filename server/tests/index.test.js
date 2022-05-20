const index = require('../index');
const routes = require('../routes/authRoutes');
const mongoose = require('mongoose');

describe('server endpoints', () => {
    let api;

    beforeAll(async () => {
        api = app.listen(3000, () => console.log('Test server running on port 3000'))
    });

    afterAll(done => {
        console.log('Stops test server')
        api.close(done)
    })

    it('should render the signup page', async () => {
        const res = await request(api).get('/signup');
        expect(res.statusCode).toEqual(200);
    })
    
    it('should render the login page', async () => {
        const res = await request(api).get('/login');
        expect(res.statusCode).toEqual(200);
    })

    it('should render the logout page', async () => {
        const res = await request(api).get('/logout');
        expect(res.statusCode).toEqual(200);
    })

    it('should render the validate page', async () => {
        const res = await request(api).get('/validate');
        expect(res.statusCode).toEqual(200);
    })

})