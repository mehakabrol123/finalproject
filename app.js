var express = require('express'),
  app = express(),
  port = 3003,
  mongoose = require('mongoose'),
  creatorMdl= require('./models/creator'),
  creatorCtl= require('./controller/creatorControll'),
  viewerMdl=require('./models/viewer'),
  uploadMdl=require('./models/upload'),

  bodyParser = require('body-parser'),
   multer  = require('multer');
  
mongoose.connect('mongodb://localhost/Final'); // local

var path = __dirname;

app.use("/final_project/data", express.static(path + "/data"));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Auth_Token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', port);

const routes= require('./router/routes');
routes(app);

app.listen(port);
module.exports = app;
console.log("Server is running")


