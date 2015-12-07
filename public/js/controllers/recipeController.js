<<<<<<< HEAD
<<<<<<< HEAD
﻿myApp.controller("RecipeCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService, config) {
    $scope.name = "Recette";
    
    $scope.changePage = function () {
        if ($scope.isEdit) { 
        $scope.isEdit = false;
        $scope.reset();
        } else {
=======
=======
>>>>>>> origin/master
﻿myApp.controller("RecipeCtrl", function ($scope, ApiService, Ressources, HelperService, PersistentDataService, config) {
    $scope.name = "Recette";
    $scope.currentDate = PersistentDataService.date;
    
    $scope.changePage = function () {
        if ($scope.isEdit)
            $scope.isEdit = false
        else {
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
            $scope.isEdit = true;
            $scope.listRecipe();
        }
    };
<<<<<<< HEAD
<<<<<<< HEAD

    $scope.$on('DateChange', function (events, args) {
        $scope.num = undefined;
        $scope.getCurrentState();
        $scope.listRecipe();
 
    })
    $scope.getCurrentState = function () {
        $scope.isLoadingCurrentState = true;
        ApiService.BankStatement.get({ params: { 'date.year' : $rootScope.currentDate.year, 'date.month' : $rootScope.currentDate.month } }, function (res) {
            $scope.currentBankStatement = HelperService.getCurrentState(res.message);
            $scope.isLoadingCurrentState = false;
        }, function (err) {
            console.log(err);
        });
    }
    $scope.getCurrentState();
    
    $scope.checkState = function () { 
        return !($scope.currentBankStatement && ($scope.currentBankStatement.status === -1 || $scope.currentBankStatement.status === 0));
    }
=======
=======
>>>>>>> origin/master
    
    $scope.$on('DateChange', function (events, args) {
        $scope.currentDate = args;
        if ($scope.isEdit)
            $scope.listRecipe();

    })
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
    
    $scope.libelleList = {
        selectedOption: {},
        availableOptions: Ressources.libelleList
    };
    
    $scope.paymentRadio = {
        selectedOption: Ressources.modePayment[0],
        availableOptions: Ressources.modePayment
    };
    
    $scope.recipeRadio = {
        selectedOption: Ressources.typeRecipes[0],
        availableOptions: Ressources.typeRecipes
    };
    
    $scope.selecteditem = undefined;
<<<<<<< HEAD
<<<<<<< HEAD
    var compteurPiece = 1;
    
    generateNumPiece = function () {
        $scope.num = HelperService.stringFormat('{0}{1}P{2}R', $rootScope.currentDate.year , HelperService.padLeft($rootScope.currentDate.month, 0 , 2), HelperService.padLeft(compteurPiece, 0 , 3));
    }

    $scope.isLoadingAccomodations = true;

    ApiService.Accomodation.get(function (res) {
        $scope.accomodationList = res.message;
        $scope.isLoadingAccomodations = false;
=======
    
    ApiService.Accomodation.get(function (res) {
        $scope.accomodationList = res.message;
>>>>>>> origin/master
=======
    
    ApiService.Accomodation.get(function (res) {
        $scope.accomodationList = res.message;
>>>>>>> origin/master
    }, function (err) {
        console.log(err);
    });
    
    $scope.selectedGite = undefined;
    
    $scope.listRecipe = function () {
<<<<<<< HEAD
<<<<<<< HEAD
            $scope.isLoadingRecipes = true;
            ApiService.Recipe.get({ params: { 'date.year' : $rootScope.currentDate.year , 'date.month' : $rootScope.currentDate.month } }, function (res) {
                $scope.recipeList = res.message;
                compteurPiece = HelperService.getLastPiece($scope.recipeList);
                generateNumPiece();            
                $scope.itemsByPage = 10;
                $scope.isLoadingRecipes = false;
            }, function (err) {
                console.log(err);
            });
    }
    
    $scope.listRecipe();   
    
    $scope.reset = function () {
        this.recipeCreationForm.reset();
        generateNumPiece();
=======
=======
>>>>>>> origin/master
        if ($scope.isEdit) {
            ApiService.Recipe.get({ params: { 'date.year' : $scope.currentDate.year , 'date.month' : $scope.currentDate.month } }, function (res) {
                $scope.recipeList = res.message;
                $scope.reset();
                $scope.itemsByPage = 10;
            }, function (err) {
                console.log(err);
            });
        }
    }
    
    $scope.reset = function () {
        this.recipeCreationForm.reset();
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
        $scope.selecteditem = undefined;
    }
    
    $scope.displayedRecipeList = [].concat($scope.recipeList);
    $scope.itemsByPage = 10;
    
    $scope.createUpdateRecipe = function (Object) {
        this.recipeCreationForm.reset();
        var recipe = new ApiService.Recipe(Object);
<<<<<<< HEAD
<<<<<<< HEAD
        if ($scope.selecteditem && $scope.selecteditem._id ) {
=======
        if (typeof $scope.selecteditem != "undefined" && typeof $scope.selecteditem._id != "undefined") {
>>>>>>> origin/master
=======
        if (typeof $scope.selecteditem != "undefined" && typeof $scope.selecteditem._id != "undefined") {
>>>>>>> origin/master
            recipe._id = $scope.selecteditem._id;
            $scope.selecteditem = undefined;
            recipe.$update(function (res) {
                HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.num_justification);
                $scope.changePage();
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
            });
        } else {
            recipe.$save(function (res) {
                HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.add, res.message.num_justification);
<<<<<<< HEAD
<<<<<<< HEAD
                compteurPiece++;
                generateNumPiece();          
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
                if ($scope.redirectToMappingWhenDone)
                    window.location.href = '#/rapprochement';
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.add, err.data.errormessage);
<<<<<<< HEAD
<<<<<<< HEAD
            });                   
=======
            });
                   
>>>>>>> origin/master
=======
            });
                   
>>>>>>> origin/master
        }
    }
    
    $scope.deleteRecipe = function (Object) {
        var recipe = new ApiService.Recipe();
        recipe.$delete({ params: { 'idList' : [].concat(Object._id) } }, function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.delete, res.message.num_justification);
            $scope.listRecipe();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.delete, err.data.errormessage);
        });
    }
    
<<<<<<< HEAD
<<<<<<< HEAD
    $scope.toNextMonth = function (Object) {
        if (Object.date.month === 12) {
            Object.date.year++;
            Object.date.month = 1;
        } else
            Object.date.month++;

        var recipe = new ApiService.Recipe(Object);
        recipe.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.num_justification);
            $scope.listRecipe();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
        });
    }
    
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
    $scope.starEditRecipe = function (Object) {
        $scope.changePage();
        $scope.selecteditem = Object;
        $scope.num = $scope.selecteditem.num_justification;
<<<<<<< HEAD
<<<<<<< HEAD
=======
        $scope.date = new Date($scope.selecteditem.date_operation.substring(0, 10));
>>>>>>> origin/master
=======
        $scope.date = new Date($scope.selecteditem.date_operation.substring(0, 10));
>>>>>>> origin/master
        $scope.montant = $scope.selecteditem.amount;
        $scope.paymentRadio.selectedOption.id = $scope.selecteditem.modePayment;
        $scope.recipeRadio.selectedOption.id = $scope.selecteditem.recipe;
        $scope.selectedGite = { "_id" : $scope.selecteditem.gite._id };
        
        switch ($scope.selecteditem.recipe) {
            case 1:
                $scope.libelleList.selectedOption.recipe = { "name" : $scope.selecteditem.description1.libelle };
                $scope.desc = $scope.selecteditem.description1.information;
                break;
            case 2:
                $scope.nomLoc = $scope.selecteditem.description2.tenant_name;
<<<<<<< HEAD
<<<<<<< HEAD
                $scope.datedebut = new Date($scope.selecteditem.description2.star_date.substring(0, 10));
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
                $scope.periodeloc = $scope.selecteditem.description2.rental_time;
                $scope.libelleList.selectedOption.location = { "name" : $scope.selecteditem.description2.libelle };
                break;
            case 3:
                $scope.datedebut = new Date($scope.selecteditem.description3.star_date.substring(0, 10));
                $scope.periode = $scope.selecteditem.description3.rental_time;
                break;
            default:
                break;
<<<<<<< HEAD
<<<<<<< HEAD
        }  
    }
    

    $scope.dialogHtml = {
        title: 'Validation de transfert des piéces justificatif des recettes',
        body:  'Vous étes sur de vouloir conserver la piéce justificatif jusqu à le mois prochaine ?',
        info:  'NB : cette opération est irréversible'
    }    
    
=======
=======
>>>>>>> origin/master
        }
   
    }
    
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
    //In case we are here from 'mapping controller', fill in the amount, and tell the controller to redirect to /mapping when done..
    if (PersistentDataService.mappingOp) {
        $scope.montant = PersistentDataService.mappingOp.amount;
        $scope.redirectToMappingWhenDone = true;
        PersistentDataService.mappingOp = null;
    }
});
