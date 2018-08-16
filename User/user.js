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
    sections: [
        {
            courseName: String,
            courseSubject: String,
            courseLevel: String,
            courseCredits: [String],
            number: String,
            timeStart: String,
            timeEnd: String,
            days: String,
            discussions: [
                {
                    number: String,
                    timeStart: String,
                    timeEnd: String,
                    days: String
                }
            ]
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