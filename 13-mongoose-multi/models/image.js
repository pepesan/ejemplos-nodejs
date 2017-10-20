var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;


var ProjectimageSchema = new Schema({
    imageLocation: String,
    project: {
        type: objectId,
        ref: 'Project'
    }
}, { collection: 'images' });
var project = mongoose.model("Image", ProjectimageSchema);

module.exports = project;
