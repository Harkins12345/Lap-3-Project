const bcrypt = require('bcrypt');
const Schema = require('./Schema');

module.exports = class User {
    constructor() { }

    static async findByEmail(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = Schema.User.findOne({ email: email.toLowerCase() });
                resolve(user);
            } catch (err) {
                reject(`User with email: ${email} not found`);
            }
        });
    }

    static async findByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = Schema.User.findOne({ username: username.toLowerCase() });
                resolve(user);
            } catch (err) {
                reject(`User with username: ${username} not found`);
            }
        });
    }

    static async create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Schema.User.create(data);
                resolve(user);
            } catch (err) {
                console.log(err)
                reject('object could not be created');
            }
        });
    };

    static async login(email, password) {
        const user = await this.findByEmail(email);
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                return user;
            }
            throw Error('Invalid password')
        }
        throw Error('Incorrect email')
    }

    static async updateGameInfo(type, amount, username) {
        try {
            switch (type) {
                case 'totalScore': await Schema.User.findOneAndUpdate({ 'username': username },
                    { '$inc': { 'gameInfo.totalScore': amount } })
                    break;
                case 'totalGames': await Schema.User.findOneAndUpdate({ 'username': username },
                    { '$inc': { 'gameInfo.totalGames': amount } })
                    break;
                case 'totalWins': await Schema.User.findOneAndUpdate({ 'username': username },
                    { '$inc': { 'gameInfo.totalWins': amount } })
                    break;
                case 'totalLosses': await Schema.User.findOneAndUpdate({ 'username': username },
                    { '$inc': { 'gameInfo.totalLosses': amount } })
                    break;
                default:
                    break;
            }

        } catch (err) {
            console.log(err)
        }
    }
}
