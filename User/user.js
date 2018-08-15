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
            timeStart: String,
            timeEnd: String,
            days: String
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);