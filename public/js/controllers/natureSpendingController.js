myApp.controller("NatureSpendingCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService, config) {
    $scope.name = "NatureDepense";
    
    $scope.createUpdateNatureSpending = function (Object) {
        this.natureSpendingCreationForm.reset();
        var natureSpending = new ApiService.NatureSpending(Object);
        if ($scope.selecteditem && $scope.selecteditem._id) {
            natureSpending._id = $scope.selecteditem._id;
            $scope.selecteditem = undefined;
            natureSpending.$update(function (res) {
                HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.name);
                $scope.listNatureSpendings();
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
            });
        } else {
            natureSpending.$save(function (res) {
                HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.add, res.message.name);
                $scope.listNatureSpendings();
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.add, err.data.errormessage);
            });
        }
    }
    
    $scope.deleteNatureSpending = function (Object) {
        var natureSpending = new ApiService.NatureSpending(Object);
        natureSpending.deleted = 1;
        Object.isBeingModified = true;
        natureSpending.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.delete, res.message.name);
            $scope.listNatureSpendings();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.delete, err.data.errormessage);
        });
    }
    
    $scope.UndoDeleteNatureSpending = function (Object) {
        var natureSpending = new ApiService.NatureSpending(Object);
        natureSpending.deleted = 0;
        Object.isBeingModified = true;
        natureSpending.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.name);
            $scope.listNatureSpendings();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
        });
    }
    
    $scope.listNatureSpendings = function () {
        $scope.isLoadingNatureSpendings = true;
        ApiService.NatureSpending.get(function (res) {
            $scope.natureSpendingList = res.message;
            $scope.itemsByPage = 5;
            $scope.atLeastOneRecord = (res.message.length > 0);
            $scope.isLoadingNatureSpendings = false;
        }, function (err) {
            console.log(err);
        });
    }
    
    $scope.reset = function () {
        this.natureSpendingCreationForm.reset();
        $scope.selecteditem = undefined;
    }
    
    $scope.listNatureSpendings();
    
    $scope.displayedNatureSpendingList = [].concat($scope.natureSpendingList);
    $scope.itemsByPage = 5;
    
    $scope.selecteditem = undefined;
    
    $scope.starEditNatureSpending = function (Object) {
        $scope.selecteditem = Object;
        $scope.natureName = $scope.selecteditem.name;
        $scope.desc = $scope.selecteditem.description !== undefined ? $scope.selecteditem.description : undefined;
        $scope.min = $scope.selecteditem.min !== undefined ? $scope.selecteditem.min : undefined;
        $scope.max = $scope.selecteditem.max !== undefined ? $scope.selecteditem.max :undefined;
        $scope.deleted = $scope.selecteditem.deleted;
    }
});
