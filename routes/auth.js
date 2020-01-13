const router =  require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

//Register route
router.post('/register', async (req, res) => {
    /** Validate the data entered by user */
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    /** Validate if the user is already in the database */
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email address already exists');

    /** Hash the password */
    const salt = await  bcrypt.genSalt(10);
    hashedPassword = await  bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: hashedPassword,
       dob: new Date(req.body.dob)
    });
    try {
        const dbSavedUser = await user.save();
        res.send({user: dbSavedUser._id});
    } catch (e) {
        res.status(400).send(e);
    }
});

//Login route
router.post('/login', async (req, res) => {
    /** Validate the data entered by user */
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    /** Validate if the user is already in the database */
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.status(400).send('Email or password is wrong');
    }

    /** Create and assign a token */
    const token = jwt.sign({"_id": user._id}, process.env.TOKEN_SECRET);
    res.header('auth_token', token).send(token);
});

module.exports = router;