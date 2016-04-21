var natureSpending = require('../models/natureSpending.js');
var helper = require('./helper/helperService.js');
var configBd;

var _natureSpendingService = {
    
    getNatureSpending : function (req, res) {
        var params = req.query.params !== undefined ? JSON.parse(req.query.params) : null;
        req.query.getone ? natureSpending.getOne(params, configBd, onGet) : natureSpending.getAll(params, configBd, onGet);
        function onGet(err, result) {
            if (err)
                helper.sendResponse(500, { "errormessage": "Erreur interne au niveau de la base de données" }, res);
            else
                helper.sendResponse(200, { "message": result }, res);
            return;
        }
    },
    
    addNatureSpending : function (req, res) {
        var newnatureSpending = req.body;
        
        if (!helper.validation.isValidNatureSpending(newnatureSpending)) {
            helper.sendResponse(401, { "errormessage": "Invalid credentials (value max must be more then value min) or one the fields is empty" }, res);
            return;
        };
        
        natureSpending.create(newnatureSpending, configBd, onUpdate);
        function onUpdate(err, result) {
            if (err)
                helper.sendResponse(401, { "errormessage": err.message }, res);
            else
                helper.sendResponse(200, { "message": result }, res);
            return;
        }
    },
    
    updateNatureSpending : function (req, res) {
        var updatedNatureSpending = req.body;
        if (updatedNatureSpending.signe === undefined) {
            updatedNatureSpending.signe = 1;
        }
        if (!helper.validation.isValidNatureSpending(updatedNatureSpending)) {
            helper.sendResponse(401, { "errormessage": "Invalid credentials (value max must be more then value min) or one the fields is empty" }, res);
            return;
        };
        
        natureSpending.update(updatedNatureSpending, configBd, onUpdate);
        function onUpdate(err, result) {
            if (err)
                helper.sendResponse(401, { "errormessage": err.message }, res);
            else
                helper.sendResponse(200, { "message": updatedNatureSpending }, res);
            return;
        }
    },

};

module.exports = _natureSpendingService;