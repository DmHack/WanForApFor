const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    code: {
        type: String,
        default: '',
    },
    refresh: {
        type: String,
        default: '',
    },
    img: {
        type: String,
        default: '',
    },
    vk: {
        type: String,
        default: '',
    },
    git: {
        type: String,
        default: '',
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Users', userSchema)