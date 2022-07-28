'use strict'
const mongoose = require('mongoose');
var Viewer = mongoose.model("viewer");



const insertViewer = async (req, res) => {
    try{
        const data = {
            name: req.body.name,
            phoneNumber: req.body.phone,
            email: req.body.email
                
        }
    
        const newUser = new Viewer(data);
        const result = await newUser.save()
        res.send(result);

    }catch (err){
        res.send('Error',+ err);
    }
}

// fetch
const findViewer = async (req,res) => {
    console.log(req.body)
    try{
        const fetchViewer = await Viewer.find()
        res.send(fetchViewer)
    }
    catch(err){
        console.log(err)
        
    }
}

// delete file
const deleteViewer = async (req,res)=> {
    try{
        const viewerDelete = await Upload.deleteOne({_id:req.body.id})
        res.send(viewerDelete)
    }
    catch(err){
        console.log(err)
    }
}

exports.insertViewer = insertViewer;

exports.findViewer = findViewer;

exports.deleteViewer = deleteViewer;