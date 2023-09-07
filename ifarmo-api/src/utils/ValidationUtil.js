const Joi = require('joi');

const userValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(30).required(),
        username: Joi.string().trim().min(2).max(30).required(),
        email: Joi.string().trim().min(8).max(30).required().email(),
        role: Joi.string().trim().valid('user', 'worker', 'farmer', 'admin').required(),
    });
    return schema.validate(data);
};

const productValidation = (data) => {
    {
        const schema = Joi.object({
            title: Joi.string().trim().min(2).max(20).required(),
            type: Joi.string().trim().required().valid('Fruit', 'Vegetable', 'Grains', 'Nuts', 'Meat', 'Dairy', 'Baked goods', 'Plants', 'Other'),
            description: Joi.string().trim().max(600).allow(null, ''),
            quantity: Joi.number().positive().default(0),
            unitType: Joi.string().trim().required().valid('piece', 'pack', 'lb', 'kg', 'g', 'gal', 'litre', 'ml', 'oz'),
            price: Joi.number().required().positive().default(0),
            city: Joi.string().trim().min(2).max(30)
        });
        return schema.validate(data);
    }
}

const jobValidation = (data) => {
    {
        const schema = Joi.object({
            title: Joi.string().trim().min(2).max(30).required(),
            type: Joi.string().trim().required().valid('Temporary', 'Full-time', 'Part-time', 'Any'),
            description: Joi.string().trim().max(600).allow(null, ''),
            salary: Joi.number().positive().default(0),
            unitType: Joi.string().trim().valid('', 'one-time', 'hour', 'day', 'week', 'month').allow(null, ''),
            city: Joi.string().trim().min(2).max(30)
        });
        return schema.validate(data);
    }
}

const equipmentValidation = (data) => {
    {
        const schema = Joi.object({
            title: Joi.string().trim().min(2).max(30).required(),
            type: Joi.string().trim().required().valid('Tools', 'Materials', 'Machinery', 'Other'),
            description: Joi.string().trim().max(600).allow(null, ''),
            quantity: Joi.number().positive().default(0),
            unitType: Joi.string().trim().valid('', 'piece', 'lb', 'kg', 'g', 'hour', 'day', 'week', 'month').allow(null, ''),
            price: Joi.number().required().positive().default(0),
            city: Joi.string().trim().min(2).max(30)
        });
        return schema.validate(data);
    }
}

const farmValidation = (data) => {
    {
        const schema = Joi.object({
            name: Joi.string().trim().min(2).max(30).required(),
            description: Joi.string().trim().max(600).allow(null, ''),
            city: Joi.string().trim().min(2).max(30)
        });
        return schema.validate(data);
    }
}

module.exports = {userValidation, productValidation, jobValidation, equipmentValidation};