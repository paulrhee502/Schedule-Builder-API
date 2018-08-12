var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true}));
var Course = require('./course');

router.post('/', function(req, res) {
    Course.create({
        sections: [],
        times: [],
        discussions: []
    }, function(err, course) {
        if(err){
            return res.status(500).send("There was an error creating the course");
        }
        return res.status(200).send(course);
    })
})

//return all courses in database
router.get('/all', function(req, res) {
    Course.find({}, function(err, courses) {
        if(err){
            return res.status(500).send("There was a problem finding the courses.");
        }
        res.status(200).send(courses);
    });
});

//return course by id
router.get('/:id', function(req, res) {
    Course.findById(req.params.id, function(err, course){
        if(err){
            return res.status(500).send("There was a problem finding the course.");
        }
        if(!course){
            return res.status(404).send("No course found.");
        }
        return res.status(200).send(course);
    })
})

//return courses by subject
router.get('/', function(req, res) {
    const subject = req.query.subject;
    Course.find({ subject: subject}, function(err, courses) {
        if(err){
            return res.status(500).send("There was a problem getting the courses for the given subject");
        }
        return res.status(200).send(courses);
    })
})

//delete course from database
router.delete('/:id', function(req, res){
    Course.findByIdAndRemove(req.params.id, function(err, course){
        if(err){
            return res.status(500).send("There was a problem deleting the course.");
        }
        res.status(200).send("Course " + course.name + " was deleted.");
    })
})

//update user in database
router.put('/:id', function(req, res){
    Course.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, course){
        if(err){
            return res.status(500).send("There was a problem updating the course.");
        }
        res.status(200).send(course);
    })
})

module.exports = router;