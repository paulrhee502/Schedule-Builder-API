var mongoose = require('mongoose');
var CourseSchema = new mongoose.Schema({
    name: String,
    level: String,
    subject: String,
    description: String,
    prereqs: [
        {
            id: String
        }
    ],
    credits: [
        {
            field: String
        }
    ], 
    sections: [
        {
            number: Number
        }
    ],
    times: [
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
    discussions: [
        {
            id: String
        }
    ]
});

module.exports = mongoose.model('Course', CourseSchema);