<<<<<<< HEAD
<<<<<<< HEAD
﻿myApp.controller("SpendingCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService, config) {
    $scope.name = "Depense";
    
    $scope.changePage = function () {
        if ($scope.isEdit) {
            $scope.isEdit = false;
            $scope.reset();
        } else {
            $scope.isEdit = true;
            $scope.listSpending();
        }   
    };
    
    $scope.$on('DateChange', function (events, args) {
        $scope.num = undefined;
        $scope.getCurrentState();
        $scope.listSpending();  
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
        return !($scope.currentBankStatement && ($scope.currentBankStatement.status === -1 || $scope.currentBankStatement.status === 0 || $scope.currentBankStatement.status === 1));
    }
    
=======
=======
>>>>>>> origin/master
﻿myApp.controller("SpendingCtrl", function ($scope, ApiService, Ressources, HelperService, PersistentDataService, config) {
    $scope.name = "Depense";
    $scope.currentDate = PersistentDataService.date;
    
    $scope.changePage = function () {
        if ($scope.isEdit)
            $scope.isEdit = false
        else {
            $scope.isEdit = true;
            $scope.listSpending();
        }
                
    };
    
    $scope.$on('DateChange', function (events, args) {
        $scope.currentDate = args;
        if ($scope.isEdit)
            $scope.listSpending();

    })
    
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
    var modePayment = Ressources.modePayment[0];
    $scope.paymentRadio = {
        selectedOption: modePayment,
        availableOptions: Ressources.modePayment
    };
    
    
    $scope.spendRadio = {
        selectedOption: Ressources.typeSpend[0],
        availableOptions: Ressources.typeSpend
    };
    
    $scope.selecteditem = undefined;
    
<<<<<<< HEAD
<<<<<<< HEAD
    var compteurPiece = 1;
    
    generateNumPiece = function () {
        $scope.num = HelperService.stringFormat('{0}{1}P{2}D', $rootScope.currentDate.year , HelperService.padLeft($rootScope.currentDate.month, 0 , 2), HelperService.padLeft(compteurPiece, 0 , 3));
    }

    $scope.isLoadingAccomodations = true;
    $scope.isLoadingSpendingNature = true;

    ApiService.Accomodation.get(function (res) {
        $scope.accomodationList = res.message;
        $scope.isLoadingAccomodations = false;
    }, function (err) {
        console.log(err);
    });
    
    ApiService.NatureSpending.get({ params: { 'deleted' : 0 } }, function (res) {
        $scope.listNatureSpend = res.message;
        $scope.isLoadingSpendingNature = false;
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
    $scope.selectedNature = undefined;
    
<<<<<<< HEAD
<<<<<<< HEAD
=======
    $scope.listNatureSpend = Ressources.natureSpend;
    
>>>>>>> origin/master
=======
    $scope.listNatureSpend = Ressources.natureSpend;
    
>>>>>>> origin/master
    $scope.infoBull = function () {
        if ($scope.selectedNature !== undefined)
            HelperService.newNotification('info', $scope.selectedNature.name, $scope.selectedNature.description !== undefined ? $scope.selectedNature.description : "Non information disponible sur la nature de dépense.");
    };
    
    $scope.listSpending = function () {
<<<<<<< HEAD
<<<<<<< HEAD
            $scope.isLoadingSpendings = true;
            ApiService.Spending.get({ params: { 'date.year' : $rootScope.currentDate.year , 'date.month' : $rootScope.currentDate.month } }, function (res) {
                $scope.spendingList = res.message;
                compteurPiece = HelperService.getLastPiece($scope.spendingList);
                generateNumPiece(); 
                $scope.itemsByPage = 10;
                $scope.isLoadingSpendings = false;
            }, function (err) {
                console.log(err);
            });     
    }
    $scope.listSpending();
    
    $scope.reset = function () {
        this.spendingCreationForm.reset();
        generateNumPiece(); 
=======
=======
>>>>>>> origin/master
        if ($scope.isEdit) {
            ApiService.Spending.get({ params: { 'date.year' : $scope.currentDate.year , 'date.month' : $scope.currentDate.month } }, function (res) {
                $scope.spendingList = res.message;
                $scope.reset();
                $scope.itemsByPage = 10;
            }, function (err) {
                console.log(err);
            });
        }
    }
    
    $scope.reset = function () {
        this.spendingCreationForm.reset();
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
        $scope.selecteditem = undefined;
    }
    
    $scope.displayedSpendingList = [].concat($scope.spendingList);
    $scope.itemsByPage = 10;
    
    $scope.createUpdateSpending = function (Object) {
        this.spendingCreationForm.reset();
        var spending = new ApiService.Spending(Object);
<<<<<<< HEAD
<<<<<<< HEAD
        if ($scope.selecteditem && $scope.selecteditem._id) {
=======
        if (typeof $scope.selecteditem != "undefined" && typeof $scope.selecteditem._id != "undefined") {
>>>>>>> origin/master
=======
        if (typeof $scope.selecteditem != "undefined" && typeof $scope.selecteditem._id != "undefined") {
>>>>>>> origin/master
            spending._id = $scope.selecteditem._id;
            $scope.selecteditem = undefined;
            spending.$update(function (res) {
                HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.num_justification);
                $scope.changePage();
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
            });
        } else {
            spending.$save(function (res) {
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
                    window.location.href = '#' + config.routes.mapping.RouteUrl;
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.add, err.data.errormessage);
            });
        }
    }
    
<<<<<<< HEAD
<<<<<<< HEAD
    $scope.toNextMonth = function (Object) {
        if (Object.date.month === 12) {
            Object.date.year++;
            Object.date.month = 1;
        } else
            Object.date.month++;
        
        var spending = new ApiService.Spending(Object);
        spending.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.num_justification);
            $scope.listSpending();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
        });
    }
    
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
    $scope.deleteSpending = function (Object) {
        var spending = new ApiService.Spending();
        spending.$delete({ params: { 'idList' : [].concat(Object._id) } }, function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.delete, res.message.num_justification);
            $scope.listSpending();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.delete, err.data.errormessage);
        });
    }
    
    $scope.starEditSpending = function (Object) {
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
        $scope.spendRadio.selectedOption.id = $scope.selecteditem.spend;
        $scope.selectedGite = { "_id" : $scope.selecteditem.gite._id };
        
        if ($scope.selecteditem.spend == 1) {
            $scope.nomFour = $scope.selecteditem.description.provider_name;
            $scope.desc = $scope.selecteditem.description.description;
            $scope.selectedNature = { 'name' : $scope.selecteditem.description.nature };
        } else {
            $scope.nomLoc = $scope.selecteditem.information.tenant_name;
<<<<<<< HEAD
<<<<<<< HEAD
            $scope.date = new Date($scope.selecteditem.information.star_date.substring(0, 10));
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
            $scope.periode = $scope.selecteditem.information.rental_time;
            $scope.motif = $scope.selecteditem.information.reason_rembourssement;
        }
    }
    
<<<<<<< HEAD
<<<<<<< HEAD
    
    $scope.dialogHtml = {
        title: 'Validation de transfert des piéces justificatif des dépenses',
        body: 'Vous étes sur de vouloir conserver la piéce justificatif jusqu à le mois prochaine ?',
        info: 'NB : cette opération est irréversible'
    }   
    
=======
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
