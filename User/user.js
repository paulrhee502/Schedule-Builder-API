var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    /*courses: [
        {
            id: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],*/
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