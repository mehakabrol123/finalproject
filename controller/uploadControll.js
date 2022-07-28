'use strict'
const mongoose = require('mongoose');
var Upload = mongoose.model("upload");
const multer  = require('multer');
const fs = require('fs');
const upload = require('../models/upload');
const viewer = require('../models/viewer');
var Viewer = mongoose.model("viewer")

// send email

const sendMail = async(result1) => {
    let user = await Viewer.find();
    console.log(user);
   var handlebars = require('handlebars');
   var fs = require('fs');
     var readHTMLFile = function(path, callback) {
       fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
           if (err) {
               throw err;
               callback(err);
           }
           else {
               callback(null, html);
           }
       });
   };
 var nodemailer = require('nodemailer');
 var smtpTransport = require('nodemailer-smtp-transport');

 var transporter = nodemailer.createTransport(smtpTransport({
 service: 'gmail',
 auth: {
   user: 'mehakindiit@gmail.com',
   pass: 'uydrpztsppjsmids'
 }
 }));

 

user.forEach((keys) =>{ readHTMLFile(__dirname + '/../templates/sendEmail.html', function(err, html) {
   var template = handlebars.compile(html);
   var replacements = {
     "USER": keys.name,
     "link": `http://localhost:3003/FINAL_PROJECT/data/video/` +result1.name
     
   };
   var htmlToSend = template(replacements);
   var mailOptions = {
     from: 'Dummy App <mehakindiit@gmail.com>',
       to: keys.email,
       subject: 'Email Account Confirmation',
       html : htmlToSend
    };
    transporter.sendMail(mailOptions, function (error, response) {
       if (error) {
         console.log('email eror', error)
         res.send({
           msg: 'Internal Server Error, Try again',
           status: 2,
           data: null
           });
       }else{
        //  res.send({
        //    msg: 'Your account has been registered',
        //    status: 1
        //    });

       }
   });
});
})

}

// uploadVideo
const uploadVideo = async  (req,res)=> {
    try{
        let dir = 'data/video/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true});
        }

        var storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, dir)
            },
            filename: function(req, file, cb) {
                console.log('file.originalname', file.originalname)
                 var fileExtn = file.originalname.split('.').pop(-1);
                cb(null, new Date().getTime() + '.' + fileExtn);
                }
          });

          var upload = multer({ storage: storage }).single('file')
                
          upload(req, res, async function(err){
            const data = {
                name: req.file.filename,
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
                email: req.body.email,
                category: req.body.category,
            }
            const newUpload = new Upload(data);
            const result = await newUpload.save();
            sendMail(result);
            res.send(result)
       
          })
        

        }catch(err){
        console.log(err)
        res.send(err)
        }
    }
    
    
    
// delete file
const deleteFile = async (req,res)=> {
    try{
        const videoDelete = await Upload.deleteOne({_id:req.body.id})
        res.send(videoDelete)
    }
    catch(err){
        console.log(err)
    }
}
    

// delete file 
const deleteVideo = async  (req, res)=> {
    try{
 
        const dirc = "data/video/";
        if (!req.params.videoname) {
          console.log("No file received");
          message = "Error! in file delete.";
          return res.status(500).json("error in delete");
        } else {
          console.log("file received");
          console.log(req.params.name);
          try {
            fs.unlinkSync(dirc + req.params.videoname + ".mp4");
            console.log("successfully deleted ");
            return res.send("Successfully! file has been Deleted");
          } catch (err) {
            return res.status(400).send(err);
          }
        }
      }catch(err){
      
      }
    }

// fetch
const findVideo = async (req,res) => {
    console.log(req.body)
    try{
        const fetchVideo = await Upload.find()
        res.send(fetchVideo)
    }
    catch(err){
        console.log(err)
        
    }
}


exports.uploadVideo = uploadVideo;

exports.deleteVideo = deleteVideo;

exports.deleteFile = deleteFile;

exports.findVideo = findVideo;

exports.sendMail = sendMail;

