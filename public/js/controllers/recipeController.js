myApp.controller("RecipeCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService, config) {
    $scope.name = "Recette";
    
    $scope.changePage = function () {
        if ($scope.isEdit) { 
        $scope.isEdit = false;
        $scope.reset();
        } else {
            $scope.isEdit = true;
            $scope.listRecipe();
        }
    };

    $scope.$on('DateChange', function (events, args) {
        $scope.num = undefined;
        $scope.getCurrentDays();
        $scope.getCurrentState();
        $scope.listRecipe();
 
    });
    
    $scope.getCurrentDays = function () {       
        // Get number of days based on month + year 
        // (January = 31, February = 28, April = 30, February 2000 = 29) or 31 if no month selected yet
        var nbDays = new Date($rootScope.currentDate.year, $rootScope.currentDate.month, 0).getDate() || 31;
        
        $scope.daysList = [];
        for (var i = 1; i <= nbDays; i++) {
            var iS = i.toString();
            $scope.daysList.push((iS.length < 2) ? '0' + iS : iS); // Adds a leading 0 if single digit
        }
    };
    $scope.getCurrentDays();

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
    var compteurPiece = 1;
    
    generateNumPiece = function () {
        $scope.num = HelperService.stringFormat('{0}{1}P{2}R', $rootScope.currentDate.year , HelperService.padLeft($rootScope.currentDate.month, 0 , 2), HelperService.padLeft(compteurPiece, 0 , 3));
    }

    $scope.isLoadingAccomodations = true;

    ApiService.Accomodation.get(function (res) {
        $scope.accomodationList = res.message;
        $scope.isLoadingAccomodations = false;
    }, function (err) {
        console.log(err);
    });
    
    $scope.selectedGite = undefined;
    
    $scope.listRecipe = function () {
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
        $scope.selecteditem = undefined;
    }
    
    $scope.displayedRecipeList = [].concat($scope.recipeList);
    $scope.itemsByPage = 10;
    
    $scope.createUpdateRecipe = function (Object) {
        this.recipeCreationForm.reset();
        var recipe = new ApiService.Recipe(Object);
        if ($scope.selecteditem && $scope.selecteditem._id ) {
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
                compteurPiece++;
                generateNumPiece();          
                if ($scope.redirectToMappingWhenDone)
                    window.location.href = '#/rapprochement';
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.add, err.data.errormessage);
                generateNumPiece(); 
            });                   
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
    
    $scope.starEditRecipe = function (Object) {
        $scope.changePage();
        $scope.selecteditem = Object;
        $scope.num = $scope.selecteditem.num_justification;
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
                $scope.day = $scope.selecteditem.description2.star_date.substring(8, 10);
                $scope.periodeloc = $scope.selecteditem.description2.rental_time;
                $scope.libelleList.selectedOption.location = { "name" : $scope.selecteditem.description2.libelle };
                break;
            case 3:
                $scope.day = $scope.selecteditem.description3.star_date.substring(8, 10);
                $scope.periode = $scope.selecteditem.description3.rental_time;
                break;
            default:
                break;
        }  
    }
    

    $scope.dialogHtml = {
        title: 'Validation de transfert des piéces justificatif des recettes',
        body: 'Vous étes sur de vouloir conserver la pièce justificative jusqu\'au mois prochain ?',
        info:  'NB : cette opération est irréversible'
    }    
    
    //In case we are here from 'mapping controller', fill in the amount, and tell the controller to redirect to /mapping when done..
    if (PersistentDataService.mappingOp) {
        $scope.montant = PersistentDataService.mappingOp.amount;
        $scope.redirectToMappingWhenDone = true;
        PersistentDataService.mappingOp = null;
    }
});
