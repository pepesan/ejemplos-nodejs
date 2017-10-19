var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true}
});


//Export model
module.exports = mongoose.model('Book', BookSchema);