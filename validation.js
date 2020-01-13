const Joi = require('joi');

//Input Validations
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        dateOfBirth: Joi.date()
            .required()
    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
};

//Input Validations
const contactValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
        phone: Joi.string()
            .min(10)
            .max(20)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        address: Joi.string()
            .required()
            .max(512)
    });
    return schema.validate(data);
};

module.exports.registerValidation =  registerValidation;
module.exports.loginValidation =  loginValidation;
module.exports.contactValidation =  contactValidation;