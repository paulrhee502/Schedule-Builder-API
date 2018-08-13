var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    breaks: [
        {
            timeStart: Number,
            timeEnd: Number,
            days: String
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);