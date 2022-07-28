"use strict";
var mongoose = require("mongoose");

var uploadSchema = new mongoose.Schema(
    {
      name: {type: String},
      title: {type: String},
      description: {type: String},
      tags: {type: String, lowercase: true, required:'#'},
      email: { type: String, lowercase: true, trim: true, required : [true, 'Email is required'] },
      category: {type:String},
      
    },
    {
        timestamps: true
    }
  )
  module.exports = mongoose.model("upload", uploadSchema);
