myApp.controller("DashboardCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService, $timeout, config, $route) {
    $scope.name = "dashboard";
    var viewName = $route.current.controllerAs;
    $scope.refresh = function () {
        switch (viewName) {
            case 'Recipe':
                $scope.displayRecipe();
                break;
            case 'Spending':
                $scope.NatureSpendings();
                break;
            case 'Recipe_Spending':
                $scope.displayRecette_Depense();
                break;
            case 'Kms':
                $scope.getScale();
                break;
            default:
                break;
        }
    }
    
    var params = {}; 
    $scope.isScale = true;
    $scope.$on('DateChange', function (events, args) {
        if (!args || (args && !args.IsOnlyMonthChange)) {
            $scope.dashboard = undefined;
            $scope.refresh();
        }
    });

    $scope.isLoadingAccomodations = true;

    ApiService.Accomodation.get(function (res) {
        $scope.accomodationList = res.message;
        $scope.isLoadingAccomodations = false;
    }, function (err) {
        console.log(err);
    });
    
    $scope.selectedGite = undefined;
    
    $scope.dashboard = undefined;
    
    $scope.displayRecipe = function () {
        $scope.isLoadingRecipes = true;
        $scope.dashboard = undefined;
        if (!$scope.selectedGite || $scope.selectedGite === null) {
            params = { 'date.year' : $rootScope.currentDate.year, 'deleted' : 0 };
        } else {
            params = { 'date.year' : $rootScope.currentDate.year, 'gite' : $scope.selectedGite._id, 'deleted' : 0 };
        }
        ApiService.Recipe.get({ params: params }, function (res) {
            $scope.dashboard = HelperService.displayDashboardRecipe(res.message);
            $scope.isLoadingRecipes = false;
        }, function (err) {
            console.log(err);
        });
    }

    $scope.NatureSpendings = function () {
        $scope.isLoadingSpendingNature = true; 
        ApiService.NatureSpending.get( function (res) {
            $scope.listNatureSpend = res.message;
            $scope.isLoadingSpendingNature = false;
            $scope.displaySpending();
        }, function (err) {
            console.log(err);
        });
    }
    
    $scope.displaySpending = function () {
        $scope.isLoadingSpendings = true;
        $scope.dashboard = undefined;
        if (!$scope.selectedGite || $scope.selectedGite === null) {
            params = { 'date.year' : $rootScope.currentDate.year , 'spend' : 1, 'deleted' : 0 };
        } else {
            params = { 'date.year' : $rootScope.currentDate.year, 'spend' : 1 , 'gite' : $scope.selectedGite._id, 'deleted' : 0 };
        }
        ApiService.Spending.get({ params: params }, function (res) { 
            $scope.dashboard = HelperService.displayDashboardSpending(res.message, $scope.listNatureSpend);
            $scope.isLoadingSpendings = false;
        }, function (err) {
            console.log(err);
        });
    }
    
    $scope.getScale = function () {
        $scope.isLoadingScale = true;
        $scope.isLoadingKms = true;
        ApiService.Scales.get({ params: { 'year' : $rootScope.currentDate.year } }, function (res) {
            $scope.listScale = res.message;
            $scope.isScale = ($scope.listScale.length === 9);
            $scope.isLoadingScale = false;
            $scope.displayKms();
        }, function (err) {
            console.log(err);
        });
    }  
        
    $scope.displayKms = function () {
        $scope.isLoadingKms = true;
        $scope.dashboard = undefined;
        if (!$scope.selectedGite || $scope.selectedGite === null) {
            params = { 'date.year' : $rootScope.currentDate.year, 'deleted' : 0 };
        } else {
            params = { 'date.year' : $rootScope.currentDate.year, 'gite' : $scope.selectedGite._id, 'deleted' : 0 };
        }
        ApiService.Km.get({ params: params }, function (res) {
            $scope.listKm = res.message;
            $scope.dashboard = HelperService.displayDashboardkm($scope.listKm, $scope.listScale);
            $scope.isLoadingKms = false;
        }, function (err) {
            console.log(err);
        });
    }       
              
    $scope.displayRecette_Depense = function () {
        $scope.isLoadingRecette_Depense = true;
        $scope.dashboard = undefined;
        if (!$scope.selectedGite || $scope.selectedGite === null) {
            params = { 'date.year' : $rootScope.currentDate.year, 'deleted' : 0 };
        } else {
            params = { 'date.year' : $rootScope.currentDate.year, 'gite' : $scope.selectedGite._id, 'deleted' : 0 };
        }
        ApiService.Recipe.get({ params: params }, function (res1) {
            params.spend = 1;
            ApiService.Spending.get({ params: params }, function (res2) {
                $scope.dashboard = HelperService.displayDashboardRecette_Depense(res1.message, res2.message);
                $scope.isLoadingRecette_Depense = false;
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
    }
        
    $scope.exportToExcel = function (tableId) { // ex: '#my-table'      
        var name;
        if (!$scope.selectedGite || $scope.selectedGite === null) {
            name = $scope.page + '_' + $rootScope.currentDate.year;
        } else {
            name = $scope.page + '_' + $scope.selectedGite.name + '_' + $rootScope.currentDate.year;
        }         
         
        var exportHref = HelperService.tableToExcel(tableId, name);
        $timeout(function () { location.href = exportHref; }, 100); // trigger download
    }


    $scope.refresh();
});
