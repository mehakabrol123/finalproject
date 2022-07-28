'use strict'
const mongoose = require('mongoose');
const creator = require('../models/creator');
var Creator = mongoose.model("creator");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const insertCreator = async (req, res) => {
    try{
        const data = {
            name: req.body.name,
            password: req.body.password,
            phoneNumber: req.body.phone,
            email: req.body.email,
            state: req.body.state,
        }
    
        const newCreator = new Creator(data);
     
        const result = await newCreator.save();

         const token = jwt.sign(
            {data_id: result._id},
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );

         // save user token
         result.token = token;

         res.status(201).json(result);
    } catch (err) {
    console.log(err);
  }

}       
// fetch
const findCreator = async (req,res) => {
    console.log(req.body)
    try{
        const fetchCreator = await Creator.find()
        res.send(fetchCreator)
    }
    catch(err){
        console.log(err)
        
    }
}

// delete file
const deleteCreator = async (req,res)=> {
    try{
        const creatorDelete = await Upload.deleteOne({_id:req.body.id})
        res.send(creatorDelete)
    }
    catch(err){
        console.log(err)
    }
}

// login
const loginCreator = async (req,res) => {
    console.log({name: req.body.name})
    res.send("Hello")
}

exports.insertCreator = insertCreator;

exports.findCreator = findCreator; 

exports.loginCreator = loginCreator;

exports.deleteCreator = deleteCreator;

