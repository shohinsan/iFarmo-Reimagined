const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        confirm_password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

const passwordValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(6).required(),
        new_password: Joi.string().min(6).required(),
        confirm_new_password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}

module.exports = {registerValidation, loginValidation, passwordValidation};
