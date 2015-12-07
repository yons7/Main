<<<<<<< HEAD
<<<<<<< HEAD
﻿myApp.controller("DashboardCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService, $timeout, config, $route) {
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
            params = { 'date.year' : $rootScope.currentDate.year };
        } else {
            params = { 'date.year' : $rootScope.currentDate.year, 'gite' : $scope.selectedGite._id };
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
            params = { 'date.year' : $rootScope.currentDate.year , 'spend' : 1 };
        } else {
            params = { 'date.year' : $rootScope.currentDate.year, 'spend' : 1 , 'gite' : $scope.selectedGite._id };
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
            params = { 'date.year' : $rootScope.currentDate.year };
        } else {
            params = { 'date.year' : $rootScope.currentDate.year, 'gite' : $scope.selectedGite._id };
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
            params = { 'date.year' : $rootScope.currentDate.year };
        } else {
            params = { 'date.year' : $rootScope.currentDate.year, 'gite' : $scope.selectedGite._id };
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
=======
=======
>>>>>>> origin/master
﻿myApp.controller("DashboardCtrl", function ($scope, ApiService, Ressources, HelperService, PersistentDataService, $timeout, config) {
        $scope.name = "dashboard";
        $scope.currentDate = PersistentDataService.date;
    var year = PersistentDataService.date.year;

        $scope.changePage = function (index) {
            $scope.index = index;
            $scope.dashboard = undefined;
            if ($scope.page === 'Recettes')
                $scope.Recipes();
            else if ($scope.page === 'Dépenses')
                $scope.Spendings();
            else if ($scope.page === 'Fraiskilométriques')
                $scope.Kms();
        };

           
        $scope.$on('DateChange', function (events, args) {
            $scope.currentDate = args;
            if (year !== $scope.currentDate.year) {
                $scope.dashboard = undefined;
                if ($scope.page === 'Recettes')
                    $scope.Recipes();
                else if ($scope.page === 'Dépenses')
                    $scope.Spendings();
                else if ($scope.page === 'Fraiskilométriques') {
                    $scope.Kms();
                    $scope.getScale();
                }
            } 
                year = $scope.currentDate.year;

        })
        
        $scope.index = 1; 
                
        $scope.Recipes = function () {
        var params = [{ 'date.year' : $scope.currentDate.year , 'modePayment' : { $in: [1, 2, 3] }, 'recipe' : { $in: [1, 2] } },
                            { 'date.year' : $scope.currentDate.year , 'modePayment' : 4, 'recipe' : { $in: [1, 2] } },
                            { 'date.year' : $scope.currentDate.year , 'recipe' : 3 }];
        ApiService.Recipe.get({ params: params[$scope.index - 1] }, function (res) {
                $scope.listRecipe = res.message;
            }, function (err) {
                    console.log(err);
            });
        }
        
        $scope.Spendings = function () {
        var params = [{ 'date.year' : $scope.currentDate.year , 'modePayment' : { $in: [1, 2, 3] }, 'spend' : 1 },
                            { 'date.year' : $scope.currentDate.year , 'modePayment' : 4, 'spend' : 1 }];
            ApiService.Spending.get({ params: params[$scope.index - 1] }, function (res) {
                $scope.listSpending = res.message;
            }, function (err) {
                console.log(err);
            });
        }
        
        $scope.Kms = function () {
            ApiService.Km.get({ params: { 'date.year' : $scope.currentDate.year } }, function (res) {             
                $scope.listKm = res.message;
            }, function (err) {
                console.log(err);
            });
        }
        
        $scope.getScale = function () {
            ApiService.Scales.get({ params: { 'year' : $scope.currentDate.year } }, function (res) {
                $scope.listScale = res.message;
            }, function (err) {
                console.log(err);
            });
        }
              
        $scope.dashboard = undefined;

        $scope.displayRecipe = function () {
            $scope.dashboard = HelperService.displayDashboardRecipe($scope.listRecipe);           
        }

        $scope.displaySpending = function () {
            $scope.dashboard = HelperService.displayDashboardSpending($scope.listSpending);                 
        }

        $scope.calculFraisKilométrique = function () {
           //$scope.listKm;listScale
            for (var km in $scope.listKm) {           
                for (var scale in $scope.listScale) {                   
                    if ($scope.listKm[km].vehicle.type === $scope.listScale[scale].type && $scope.listKm[km].vehicle.cv === $scope.listScale[scale].cv) {
                        if ($scope.listKm[km].km < $scope.listScale[scale].interval.t2.from) {
                            $scope.listKm[km].amount = Math.round(((Math.round(($scope.listScale[scale].interval.t1.rate * $scope.listKm[km].km) * 100) / 100) + $scope.listScale[scale].interval.t1.constant) * 100) / 100;
                            $scope.listKm[km].taux = '(' + $scope.listScale[scale].interval.t1.rate + ' * d) + ' + $scope.listScale[scale].interval.t1.constant;
                        }
                        if ($scope.listKm[km].km >= $scope.listScale[scale].interval.t2.from && $scope.listKm[km].km <= $scope.listScale[scale].interval.t2.to) {
                            $scope.listKm[km].amount = Math.round(((Math.round(($scope.listScale[scale].interval.t2.rate * $scope.listKm[km].km) * 100) / 100) + $scope.listScale[scale].interval.t2.constant) * 100) / 100;
                            $scope.listKm[km].taux = '(' + $scope.listScale[scale].interval.t2.rate + ' * d) + ' + $scope.listScale[scale].interval.t2.constant;
                        }
                        if ($scope.listKm[km].km > $scope.listScale[scale].interval.t2.to) {
                            $scope.listKm[km].amount = Math.round(((Math.round(($scope.listScale[scale].interval.t3.rate * $scope.listKm[km].km) * 100) / 100) + $scope.listScale[scale].interval.t3.constant) * 100) / 100;
                            $scope.listKm[km].taux = '(' + $scope.listScale[scale].interval.t3.rate + ' * d) + ' + $scope.listScale[scale].interval.t3.constant;
                        }
                    }
                }
            }
        }

        $scope.displayKm = function () {
            $scope.calculFraisKilométrique();
            $scope.dashboard = HelperService.displayDashboardkm($scope.listKm);
        }
        
        $scope.exportToExcel = function (tableId) { // ex: '#my-table'            
            var name = $scope.page + ($scope.index === 2 ? '_Liquide_' : ($scope.index === 3 ? '_Occupation Personelle_' : '_')) + $scope.currentDate.year;
            var exportHref = HelperService.tableToExcel(tableId, name);
            $timeout(function () { location.href = exportHref; }, 100); // trigger download
        }


        $scope.Recipes();
        $scope.Spendings();
        $scope.Kms();
        $scope.getScale();   

<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
});
