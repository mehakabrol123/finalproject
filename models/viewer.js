"use strict";
var mongoose = require("mongoose");
var viewerSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      phoneNumber: { type: Number },
      email: { type: String, lowercase: true, trim: true, required : [true, 'Email is required'] }
      
    },
    {timestamps: true}
  );
  
  module.exports = mongoose.model("viewer", viewerSchema);
  
  