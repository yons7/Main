myApp.controller("ScalesCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService, config) {
    $scope.name = "Bareme";
    
    $scope.selecteditem = {};
    var obj = Ressources.vehicle[0];
    $scope.paramlist = {
        selectedOption: obj,
        availableOptions: Ressources.vehicle
    };
    if (PersistentDataService.user && PersistentDataService.user.role)
        $scope.isAdmin = (PersistentDataService.user.role === 1);

    $scope.displayedIntervalList = function () {
        $scope.isLoadingScales = true;
        ApiService.Scales.get({ params: { 'type' : $scope.paramlist.selectedOption.name, 'year' : $rootScope.currentDate.year } }, function (res) {
            $scope.intervalList = res.message;
            if (($scope.intervalList.length === 5 && $scope.paramlist.selectedOption.name === 'Voitures') ||
                ($scope.intervalList.length === 3 && $scope.paramlist.selectedOption.name === 'Deux-roues') ||
                ($scope.intervalList.length === 1 && $scope.paramlist.selectedOption.name === 'Cyclomoteurs')) {
                $scope.isScaleFull = true;
            } else {
                $scope.isScaleFull = false;
            }
            $scope.isLoadingScales = false;
        }, function (err) {
            console.log(err);
        });
        
    }
       
    $scope.getScale = function (Object) {
        $scope.selecteditem = Object;
        $scope.paramlist.selectedOption.value = Object.cv;
    }
    
    $scope.clean = function (Object) {
        $scope.selecteditem = {};
    }
        
    $scope.updateScale = function (Object) {
        if ($scope.selecteditem && $scope.selecteditem._id) {
            var scale = new ApiService.Scales($scope.selecteditem);
            scale.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.type + ' (' + res.message.cv + ')');
                $scope.displayedIntervalList();
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
            });
        } else {
            var scale = new ApiService.Scales(Object);
            scale.$save(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.add, res.message.type + ' (' + res.message.cv + ')');
                $scope.displayedIntervalList();
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.add, err.data.errormessage);
            });                   
        }
        $scope.clean();
    }
        
    $scope.displayedIntervalList();
        
    $scope.$on('DateChange', function (events, args) {
        (!args || (args && !args.IsOnlyMonthChange)) && $scope.displayedIntervalList();
    });              
});