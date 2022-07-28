'use strict'


module.exports = function(app){
    //post query
    var creator = require('../controller/creatorControll');
    app.route('/addcreator').post(creator.insertCreator);
    //viewer 
    var viewer = require('../controller/viewerControll');
    app.route('/viewer').post(viewer.insertViewer);
    // uploadfile
    var upload = require('../controller/uploadControll');
    app.route('/upload').post(upload.uploadVideo);
    // app.route('/sendmail').post(upload.sendMail) 
    var auth = require('../middleware/auth')
    

    // fetch
    app.route('/fetchCreator').get(creator.findCreator);
    app.route('/fetchViewer').get(viewer.findViewer);
    app.route('/fetchVideo').get(upload.findVideo);


// delete
app.route('/deleteFile').post(upload.deleteFile)
app.route('/deleteCreator').post(creator.deleteCreator)
app.route('/deleteViewer').post(viewer.deleteViewer)


// deletevideo
app.route('/deleteVideo/:videoname').post(upload.deleteVideo)

//auth
app.route('/login').get(auth.verifyToken,creator.loginCreator)



}
