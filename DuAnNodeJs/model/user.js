const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    provider: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('UserAuth', userAuthSchema);