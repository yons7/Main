﻿var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;
<<<<<<< HEAD
<<<<<<< HEAD
var helper = require('../services/helper/helperService.js');
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master

module.exports = function (req, res, next) {
    
    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe. 
    
    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();
    
    
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    
    if (token || key) {
        try {
            var decoded = jwt.decode(token, global.config.auth.secret);
            
            if (decoded.exp <= Date.now()) {
<<<<<<< HEAD
<<<<<<< HEAD
                helper.sendResponse(400, { "message": "Token Expired" }, res);
=======
=======
>>>>>>> origin/master
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired"
                });
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
                return;
            }
            
            // Authorize the user to see if s/he can access our resources                        
            
            validateUser(decoded.user, function (dbUser) {
                if (dbUser) {                   
                    if ((req.url.indexOf('admin') >= 0 && dbUser.role == 1) || (req.url.indexOf('admin') < 0 && req.url.indexOf(config.client.apiUrl) >= 0)) {
                        req.User = dbUser;
                        next(); // To move to next middleware
                    } else {
<<<<<<< HEAD
<<<<<<< HEAD
                        helper.sendResponse(403, { "message": "Not Authorized" }, res);
=======
=======
>>>>>>> origin/master
                        res.status(403);
                        res.json({
                            "status": 403,
                            "message": "Not Authorized"
                        });
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
                        return;
                    }
                } else {
                    // No user with this name exists, respond back with a 401
<<<<<<< HEAD
<<<<<<< HEAD
                    helper.sendResponse(401, { "message": "Invalid User" }, res);
=======
=======
>>>>>>> origin/master
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Invalid User"
                    });
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
                    return;
                }
            }); 
 
        } catch (err) {
<<<<<<< HEAD
<<<<<<< HEAD
            helper.sendResponse(500, { "errormessage": err }, res);
        }
    } else {
        helper.sendResponse(401, { "message": "Invalid Token or Key" }, res);
=======
=======
>>>>>>> origin/master
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid Token or Key"
        });
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
        return;
    }
};