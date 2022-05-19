const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', password: '', email: '' };

    if (err.message === 'Incorrect email') {
        errors.email = 'That email is not registered'
    }

    if (err.message === 'Invalid password') {
        errors.email = 'That password is incorrect'
    }

    //duplicate error codename
    if (err.code === 11000 && err.message.includes('username')) {
        errors.username = 'That username is already in use'
        return errors;
    } else if (err.code === 11000 && err.message.includes('email')) {
        errors.username = 'That email is already in use'
        return errors;
    }

    console.log(err);
    return errors;
}

const jwtMaxAge = 3 * 24 * 60 * 60; //3 days

//jwt
const createToken = (id) => {
    return jwt.sign({ id }, 'secret')
}


//signup get
async function getSignup(req, res) {
    try {
        res.render('signup', { title: 'Sign Up' })
        res.status(200)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

//signup post
async function addUser(req, res) {
    const { username, password, email } = req.body;
    try {
        await User.create({ username, password, email })
        const token = await createToken(username);
        res.cookie('jwt', token, { httpOnly: false, maxAge: jwtMaxAge * 1000 }) //3 days
        res.status(201).json({ user: username });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(422).json({ errors });
    }
}


//login get
async function getLogin(req, res) {
    try {
        res.render('login', { user: req.user, title: 'Login' })
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

//login post
async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user.username);
        res.cookie('jwt', token, { httpOnly: false, maxAge: jwtMaxAge * 1000 }) //3 days
        res.status(200).json({ user: user.username })
    } catch (err) {
        const errors = handleErrors(err);
        res.status(422).json({ err });
    }
}

//logout get
async function getLogout(req, res) {
    try {
        //replacing jwt with empty cookie with 1 millisecond expiration
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
        res.status(204)
    } catch (err) {
        console.log(err)
        res.status(406).json({ err })
    }
}

//Validate WebToken
async function validateWebtoken(req, res) {
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
              res.status(401).json({ error: "Invalid webtoken" });
            } else {
                res.json({username: decodedToken.id})
            }
          })
    } catch (err) {
        console.log(err)
        res.status(401).json({ err })
    }
}



module.exports = { handleErrors, getSignup, addUser, getLogin, loginUser, getLogout, validateWebtoken }
