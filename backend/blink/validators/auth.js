const { body } = require('express-validator');

module.exports = [
    body('email')
    .isEmpty()
    .withMessage("Email Required"),
    body('password')
    .isEmpty()
    .withMessage("Password Required"),
];