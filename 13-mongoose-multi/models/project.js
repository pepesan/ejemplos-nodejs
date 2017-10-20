var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

var projectSchema = new Schema({
    name: {type: String, required : true},
    designation: {type: String, required : true},
    status: {type: Number, required : true},
    type: {type: Number, required : true},
    berief_text: {type: String, required : true},
    images: [{
        type: objectId,
        ref: 'Image'
    }]
}, { collection: 'project' });

var project = mongoose.model("Project", projectSchema);

module.exports = project;

