var userService = require('./userService');


var getDataControllerfn = async(req, res) => {
    var questions = await userService.getDataFromDBService();
    res.send({"status":true, "data": questions})
}

var createUserControllerFn = async(req, res) => {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log("********************************");
    console.log(status);
    console.log("********************************");

    if (status){
        res.send({"status":true, "message": "Question uploaded successfully"})
    } else {
        res.send({"status":false, "message": "Error uplaoding the question"});
    }
}

module.exports = {getDataControllerfn, createUserControllerFn};