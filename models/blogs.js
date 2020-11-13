 var mongoose = require("mongoose");


var blogSchema = new mongoose.Schema({
	title: {type: String,  required: true},
	description:{type: String,  required: true},
	mhead:{type: String,  required: true},
	subhead:{type: String,  required: true},

});

module.exports = mongoose.model("blogs", blogSchema);