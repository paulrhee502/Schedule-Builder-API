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

module.exports = router;