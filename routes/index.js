var express = require('express');
var path = require('path');
var router = express.Router();

var auth = require('./auth.js');
var UserService = require('../services/userService.js');
var AccomodationService = require('../services/accomodationService.js');
var ScaleService = require('../services/scaleService.js');
<<<<<<< HEAD
<<<<<<< HEAD
var NatureSpendingService = require('../services/natureSpendingService.js');
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
var SpendingService = require('../services/spendingService.js');
var RecipeService = require('../services/recipeService.js');
var BankStatementService = require('../services/bankStatementService.js');
var VehicleService = require('../services/vehicleService.js');
var KmService = require('../services/kmService.js');
<<<<<<< HEAD
<<<<<<< HEAD
var helper = require('../services/helper/helperService.js');
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);

//Share Client Section Of Config.js with the Client Side, accessible via: myApp.Appsettings
router.get('/appSettings', function (req, res) {
<<<<<<< HEAD
<<<<<<< HEAD
    helper.sendResponse(200, { "message": global.config.client }, res);
=======
    res.json(global.config.client);
>>>>>>> origin/master
=======
    res.json(global.config.client);
>>>>>>> origin/master
});


/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get(config.client.userApiUrl, UserService.getUser);
router.post(config.client.userApiUrl, UserService.addUser);
router.delete(config.client.userApiUrl, UserService.deleteUser);
router.put(config.client.userApiUrl + '/:id', UserService.updateUser);

<<<<<<< HEAD
<<<<<<< HEAD
router.get(config.client.natureSpendingApiUrl, NatureSpendingService.getNatureSpending);
router.post(config.client.natureSpendingApiUrl, NatureSpendingService.addNatureSpending);
router.put(config.client.natureSpendingApiUrl + '/:id', NatureSpendingService.updateNatureSpending);

=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
router.get(config.client.accomodationApiUrl, AccomodationService.getAccomodation);
router.post(config.client.accomodationApiUrl, AccomodationService.addAccomodation);
router.delete(config.client.accomodationApiUrl, AccomodationService.deleteAccomodation);
router.put(config.client.accomodationApiUrl + '/:id', AccomodationService.updateAccomodation);

<<<<<<< HEAD
<<<<<<< HEAD
router.get(config.client.scalesApiUrl.replace("admin/", "") , ScaleService.getScale);      //get is available to both admin and normal users here
=======
router.get(config.client.scalesApiUrl , ScaleService.getScale);
>>>>>>> origin/master
=======
router.get(config.client.scalesApiUrl , ScaleService.getScale);
>>>>>>> origin/master
router.post(config.client.scalesApiUrl , ScaleService.addScale);
router.put(config.client.scalesApiUrl + '/:id', ScaleService.updateScale);

router.get(config.client.spendingApiUrl , SpendingService.getSpending);
router.post(config.client.spendingApiUrl , SpendingService.addSpending);
router.put(config.client.spendingApiUrl + '/:id', SpendingService.updateSpending);
router.delete(config.client.spendingApiUrl, SpendingService.deleteSpending);

router.get(config.client.recipeApiUrl , RecipeService.getRecipe);
router.post(config.client.recipeApiUrl , RecipeService.addRecipe);
router.put(config.client.recipeApiUrl + '/:id', RecipeService.updateRecipe);
router.delete(config.client.recipeApiUrl, RecipeService.deleteRecipe);

router.get(config.client.bankStatementApiUrl , BankStatementService.getBankStatement);
router.post(config.client.bankStatementApiUrl , BankStatementService.addBankStatement);
router.put(config.client.bankStatementApiUrl + '/:id', BankStatementService.updateBankStatement);
router.delete(config.client.bankStatementApiUrl , BankStatementService.deleteBankStatement);

router.get(config.client.vehicleApiUrl, VehicleService.getVehicle);
router.post(config.client.vehicleApiUrl, VehicleService.addVehicle);
router.delete(config.client.vehicleApiUrl, VehicleService.deleteVehicle);
router.put(config.client.vehicleApiUrl + '/:id', VehicleService.updateVehicle);

router.get(config.client.kmApiUrl, KmService.getKm);
router.post(config.client.kmApiUrl, KmService.addKm);
router.delete(config.client.kmApiUrl, KmService.deleteKm);
router.put(config.client.kmApiUrl + '/:id', KmService.updateKm);

module.exports = router;