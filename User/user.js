var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    courses: [
        {
            id: String
        }
    ],
    breaks: [
        {
            timeStart: Number,
            timeEnd: Number,
            days: [
                {
                    day: String
                }
            ]
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);