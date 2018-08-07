var mongoose = require('mongoose');
var CourseSchema = new mongoose.Schema({
    section: [
        {
            number: Number
        }
    ],
    time: [
        {
            timeStart: Number,
            timeEnd: Number,
            days: [
                {
                    day: String
                }
            ]
        }
    ],
    discussion: [
        {
            id: String
        }
    ]
});

module.exports = mongoose.model('Course', CourseSchema);