myApp.controller("SpendingCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService, config) {
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
    }, function (err) {
        console.log(err);
    });
    
    $scope.selectedGite = undefined;
    $scope.selectedNature = undefined;
    
    $scope.infoBull = function () {
        if ($scope.selectedNature !== undefined)
            HelperService.newNotification('info', $scope.selectedNature.name, $scope.selectedNature.description !== undefined ? $scope.selectedNature.description : "Non information disponible sur la nature de dépense.");
    };
    
    $scope.listSpending = function () {
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
        $scope.selecteditem = undefined;
    }
    
    $scope.displayedSpendingList = [].concat($scope.spendingList);
    $scope.itemsByPage = 10;
    
    $scope.createUpdateSpending = function (Object) {
        this.spendingCreationForm.reset();
        var spending = new ApiService.Spending(Object);
        if ($scope.selecteditem && $scope.selecteditem._id) {
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
                compteurPiece++;
                generateNumPiece(); 
                if ($scope.redirectToMappingWhenDone)
                    window.location.href = '#' + config.routes.mapping.RouteUrl;
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.add, err.data.errormessage);
            });
        }
    }
    
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
            $scope.date = new Date($scope.selecteditem.information.star_date.substring(0, 10));
            $scope.periode = $scope.selecteditem.information.rental_time;
            $scope.motif = $scope.selecteditem.information.reason_rembourssement;
        }
    }
    
    
    $scope.dialogHtml = {
        title: 'Validation de transfert des piéces justificatif des dépenses',
        body: 'Vous étes sur de vouloir conserver la piéce justificatif jusqu à le mois prochaine ?',
        info: 'NB : cette opération est irréversible'
    }   
    
    //In case we are here from 'mapping controller', fill in the amount, and tell the controller to redirect to /mapping when done..
    if (PersistentDataService.mappingOp) {
        $scope.montant = PersistentDataService.mappingOp.amount;
        $scope.redirectToMappingWhenDone = true;
        PersistentDataService.mappingOp = null;
    }
});
