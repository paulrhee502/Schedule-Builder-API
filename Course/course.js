var mongoose = require('mongoose');
var CourseSchema = new mongoose.Schema({
    name: String,
    level: String,
    subject: String,
    description: String,
    prereqs: [String],
    credits: [String], 
    sections: [{
        number: String,
        classNumber: Number,
        roomNum: String,
        days: String,
        timeStart: String,
        timeEnd: String,
        instructor: String
    }],
    discussions: [String]
});

module.exports = mongoose.model('Course', CourseSchema);