var mongooseDAO = require("./common/mongooseDAO.js");
var configBd, db, model;

function NatureSpending() {
    
    var natureSpending = {};
    
    var modelName = "natureSpendings";
    natureSpending.__proto__ = mongooseDAO(modelName);      //inherits mongooseDAO class and connects to "natureSpendings" model.
    db = natureSpending.db();
    
    return natureSpending;
}

module.exports = NatureSpending();