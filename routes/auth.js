﻿var jwt = require('jwt-simple');
var user = require('../models/user.js');
<<<<<<< HEAD
<<<<<<< HEAD
var helper = require('../services/helper/helperService.js');
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master

var auth = {
    login: function (req, res) {
        var email = req.body.email || '';
        var password = req.body.password || '';
        if (email == '' || password == '') {
<<<<<<< HEAD
<<<<<<< HEAD
            helper.sendResponse(401, { "message": "Invalid credentials" }, res);
=======
=======
>>>>>>> origin/master
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
            return;
        }
        // Fire a query to your DB and check if the credentials are valid
        user.validateUser(email , password, function (err, dbUserObj){
            if (!dbUserObj) { // If authentication fails, we send a 401 back
<<<<<<< HEAD
<<<<<<< HEAD
                helper.sendResponse(401, { "message": err }, res);
=======
=======
>>>>>>> origin/master
                res.status(401);
                res.json({
                    "status": 401,
                    "message": err
                });
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
                return;
            }
            if (dbUserObj) {
                // If authentication is success, we will generate a token
                // and dispatch it to the client
<<<<<<< HEAD
<<<<<<< HEAD
                helper.sendResponse(200, genToken(dbUserObj), res);
=======
                res.json(genToken(dbUserObj));
>>>>>>> origin/master
=======
                res.json(genToken(dbUserObj));
>>>>>>> origin/master
            }
        });
        
    },

    validateUser: function (currentUser, cb) {

        if (currentUser !== undefined && currentUser.email !== undefined && currentUser.password !== undefined) {
            
            user.validateUser(currentUser.email , currentUser.password, function (err, dbUserObj) {                
                return cb(dbUserObj);
            });
        }       
    },
}
// private method
function genToken(user) {
    var expires = expiresIn(global.config.auth.tokenExpiration); // 7 days
    var token = jwt.encode({
        exp: expires,
        user:user                 //we add user to the token for extra security
    }, global.config.auth.secret);
    delete user._doc.password;  //remove password before sending back to client
    return {
        token: token,
        expires: expires,
        user: user
    };
}
function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}
module.exports = auth;