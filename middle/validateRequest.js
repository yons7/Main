var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;
var helper = require('../services/helper/helperService.js');

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
                helper.sendResponse(400, { "message": "Token Expired" }, res);
                return;
            }
            
            // Authorize the user to see if s/he can access our resources                        
            
            validateUser(decoded.user, function (dbUser) {
                if (dbUser) {                   
                    if ((req.url.indexOf('admin') >= 0 && dbUser.role == 1) || (req.url.indexOf('admin') < 0 && req.url.indexOf(config.client.apiUrl) >= 0)) {
                        req.User = dbUser;
                        next(); // To move to next middleware
                    } else {
                        helper.sendResponse(403, { "message": "Not Authorized" }, res);
                        return;
                    }
                } else {
                    // No user with this name exists, respond back with a 401
                    helper.sendResponse(401, { "message": "Invalid User" }, res);
                    return;
                }
            }); 
 
        } catch (err) {
            helper.sendResponse(500, { "errormessage": err }, res);
        }
    } else {
        helper.sendResponse(401, { "message": "Invalid Token or Key" }, res);
        return;
    }
};