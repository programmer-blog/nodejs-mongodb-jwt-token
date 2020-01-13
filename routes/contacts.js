const router =  require('express').Router();
const Contact = require('../model/Contact');
const verify = require('./verifyToken');
const { contactValidation } = require('../validation');

router.get('/', verify, (req, res) => {
    let contacts = Contact.find().exec(function(err, contacts){
        res.send(contacts)
    });
});

/** Create a Contact */
router.post('/', verify, async (req, res) => {

    /** Validate the data entered by user */
    const { error } = contactValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    /** Validate if the contact is already in the database */
    const phoneExists =  await Contact.findOne({phone: req.body.phone});
    if(phoneExists) return res.status(400).send('This phone number already exists');

    //Create new contact
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
    });
    try {
        const dbSavedContact = await contact.save();
        res.send({contact: dbSavedContact});
    } catch (e) {
        res.status(400).send(e);
    }
});

/** Update a Contact */
router.put('/', verify, async (req, res) => {

    /** Validate the data entered by user */
    const { error } = contactValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    /** Validate if the contact is already in the database */
    /*const phoneExists =  await Contact.findOne({phone: req.body.phone});
    if(phoneExists) return res.status(400).send('This phone number already exists');*/
    //Create new contact
    const contact  = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
    };

    try {
        const dbSavedContact = await  Contact.findByIdAndUpdate(req.query.id,contact, function(err, contact) {
            if (err) res.status(400).send(err);
            res.send({contact: contact});
        });
    }catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;