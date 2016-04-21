myApp.controller("KmCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService, config) {
    $scope.name = "KM";
    
    $scope.changePage = function () {
        if ($scope.isEdit) {
            $scope.isEdit = false;
            $scope.reset();
        } else {
            $scope.isEdit = true;
            $scope.listKm();
        }
    };
    
    $scope.$on('DateChange', function (events, args) {
        $scope.num = undefined;
        $scope.daysList = HelperService.getCurrentDays($rootScope.currentDate.year, $rootScope.currentDate.month);
        $scope.listKm(); 
    })
    
    $scope.daysList = HelperService.getCurrentDays($rootScope.currentDate.year, $rootScope.currentDate.month);
    
    $scope.deleteKm = function (Object) {
        var km = new ApiService.Km(Object);
        km.deleted = 1;
        Object.isBeingModified = true;
        km.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.delete, res.message.name);
            $scope.listKm();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.delete, err.data.errormessage);
        });
    }
    
    $scope.UndoDeleteKm = function (Object) {
        var km = new ApiService.Km(Object);
        km.deleted = 0;
        Object.isBeingModified = true;
        km.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.name);
            $scope.listKm();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
        });
    }
    
    $scope.trajetRadio = {
        selectedOption: Ressources.typeTrajet[0],
        availableOptions: Ressources.typeTrajet
    };

    $scope.selecteditem = undefined;
    
    var compteurPiece = 1;
    
    generateNumPiece = function () {
        $scope.num = HelperService.stringFormat('{0}{1}P{2}K', $rootScope.currentDate.year , HelperService.padLeft($rootScope.currentDate.month, 0 , 2), HelperService.padLeft(compteurPiece, 0 , 3));
    }

    $scope.isLoadingAccomodations = true;
    ApiService.Accomodation.get(function (res) {
        $scope.accomodationList = res.message;
        $scope.isLoadingAccomodations = false;
    }, function (err) {
        console.log(err);
    });
    
    $scope.isLoadingVehicles = true;
    ApiService.Vehicle.get(function (res) {
        $scope.vehicleList = res.message;
        $scope.isLoadingVehicles = false;
    }, function (err) {
        console.log(err);
    });
    
    $scope.selectedGite = undefined;
    $scope.selectedvehicle = undefined;
    
    $scope.listKm = function () {
            $scope.isLoadingkms = true;
            ApiService.Km.get({ params: { 'date.year' : $rootScope.currentDate.year , 'date.month' : $rootScope.currentDate.month } }, function (res) {
                $scope.kmList = res.message;
                compteurPiece = HelperService.getLastPiece($scope.kmList);
                generateNumPiece();    
                $scope.itemsByPage = 10;
                $scope.isLoadingkms = false;
            }, function (err) {
                console.log(err);
            }); 
    }
    
    $scope.listKm();
    
    $scope.toNextMonth = function (Object) {
        if (Object.date.month === 12) {
            Object.date.year++;
            Object.date.month = 1;
        } else
            Object.date.month++;
        
        var Km = new ApiService.Km(Object);
        Km.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.num_justification);
            $scope.listKm();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
        });
    }
    
    $scope.reset = function () {
        this.kmCreationForm.reset();
        generateNumPiece();
        $scope.selecteditem = undefined;
    }
    
    $scope.displayedKmList = [].concat($scope.kmList);
    $scope.itemsByPage = 10;
    
    $scope.createUpdateKm = function (Object) {
        this.kmCreationForm.reset();
        var km = new ApiService.Km(Object);
        if ($scope.selecteditem  && $scope.selecteditem._id) {
            km._id = $scope.selecteditem._id;
            $scope.selecteditem = undefined;
            km.$update(function (res) {
                HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.num_justification);
                $scope.changePage();
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
            });
        } else {
            km.$save(function (res) {
                HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.add, res.message.num_justification);
                compteurPiece++;
                generateNumPiece();   
            }, function (err) {
                generateNumPiece(); 
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.add, err.data.errormessage);
            });
        }
    }
    
    //$scope.deleteKm = function (Object) {
    //    var km = new ApiService.Km();
    //    km.$delete({ params: { 'idList' : [].concat(Object._id) } }, function (res) {
    //        HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.delete, res.message.num_justification);
    //        $scope.listKm();
    //    }, function (err) {
    //        HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.delete, err.data.errormessage);
    //    });
    //}
    
    $scope.starEditKm = function (Object) {
        $scope.changePage();
        $scope.selecteditem = Object;
        $scope.num = $scope.selecteditem.num_justification;
        $scope.selectedGite = { "_id" : $scope.selecteditem.gite._id };
        $scope.selectedvehicle = { "_id" : $scope.selecteditem.vehicle._id };
        $scope.day = $scope.selecteditem.date_travel.substring(8, 10);
        $scope.trajetRadio.selectedOption.id = $scope.selecteditem.trajet;
        $scope.nombreKms = $scope.selecteditem.km;
        $scope.start = $scope.selecteditem.start_place;
        $scope.finish = $scope.selecteditem.finish_place;
        $scope.motif = $scope.selecteditem.motif;
    }

    
    $scope.dialogHtml = {
        title: 'Validation du transfert des pièces justificatives de frais kilométriques',
        body:  'Confirmer le transfert de la pièce justificative sur le mois prochain (car pas sur le relevé bancaire du mois)',
        info:  'NB : cette opération est irréversible'
    }   

});

