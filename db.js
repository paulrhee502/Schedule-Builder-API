var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://paulrhee:Xzl25p56p@schedulecluster-m8xlu.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));