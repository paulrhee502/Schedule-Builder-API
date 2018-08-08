var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true}));
var User = require('./user');

//login user in session
router.post('/session', function(req, res){
    User.findOne({username: req.body.username}, async (err, user) => {
        if(err){
            return res.status(500).send("There was a problem accessing the database.");
        }
        if(!user){
            return res.status(400).send("There is no username registered with the given username. Please try again.");
        }
        else{
            var passwordCorrect = await bcrypt.compare(req.body.password, user.password);
            if(!passwordCorrect){
                return res.status(400).send("Incorrect password for the given username. Please try again.");
            }
            var jtoken = jwt.sign(
                {
                    user: user
                },
                'shh',
                {
                    issuer: 'paul',
                    audience: 'tbd',
                },
            );
            return res.status(200).send(jtoken);
        }
    })
})

//register new user
router.post('/', function(req, res) {
    User.findOne({ username: req.body.username}, async (err, user) => {
        if(err){
            return res.status(500).send("There was a problem accessing the user database");
        }
        if(user){
            return res.status(409).send("User with that username already exists");
        }
        else if(req.body.password == ""){
            return res.status(400).send("Invalid password.")
        }
        else{
            let hashedPassword = await bcrypt.hash(req.body.password, 8);
            User.create({
                username: req.body.username,
                password: hashedPassword,
                breaks: [],
                courses: []
            }, function(err, user) {
                if(err){
                    return status(500).send("There was a problem adding the information to the database.");
                }
                var jtoken = jwt.sign(
                    {
                    user: user
                    },
                    'shh',
                {
                    issuer: 'paul',
                    audience: 'tbd'
                })
                return res.send(jtoken);
            })
        }
    })
});

//return all users in database
router.get('/all', function(req, res) {
    User.find({}, function(err, users) {
        if(err){
            return res.status(500).send("There was a problem finding the users.");
        }
        res.status(200).send(users);
    });
});

//return single user from database by id
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, user){
        if(err){
            return res.status(500).send("There was a problem finding the user.");
        }
        if(!user){
            return res.status(404).send("No user found.");
        }
        res.status(200).send(user);
    })
})

//return user by jwt
router.get('/', function(req, res) {
    const token = req.query.token;
    if(!token){
        return res.status(400).send("JWT required");
    }
    jwt.verify(token, 'shh', function(err, decoded){
        if(err){
            return res.status(500).send(err);
        }
        return res.status(200).send(decoded);
    });
})

//delete user from database
router.delete('/:id', function(req, res){
    User.findByIdAndRemove(req.params.id, function(err, user){
        if(err){
            return res.status(500).send("There was a problem deleting the user.");
        }
        res.status(200).send("User " + user.username + " was deleted.");
    })
})

//update user in database
router.put('/:id', function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user){
        if(err){
            return res.status(500).send("There was a problem updating the user.");
        }
        res.status(200).send(user);
    })
})

module.exports = router;