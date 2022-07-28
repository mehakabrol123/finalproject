"use strict";
var mongoose = require("mongoose");
var creatorSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      password: {type: String},
      phoneNumber: {type: Number},
      email: { type: String, lowercase: true, trim: true, required : [true, 'Email is required'] },
      state: {type: String, default:null}
    },
    {timestamps: true}
  );
  
  module.exports = mongoose.model("creator", creatorSchema);
  
  