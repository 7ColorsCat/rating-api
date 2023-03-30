const Ajv = require("ajv");

function validate(schema) {
    const ajv = new Ajv({ allErrors: true });
    const validateFn = ajv.compile(schema);

    return (req, res, next) => {
        const valid = validateFn(req.body);

        if (valid) {
            next();
        } else {
            const errors = validateFn.errors.map((err) => {
                return {
                    message: err.message,
                    path: err.instancePath,
                };
            });
            res.status(400).json({ errors });
        }
    };
}

module.exports = validate;
