<<<<<<< HEAD
<<<<<<< HEAD
﻿myApp.controller("HomeCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService) {
    $scope.name = "Synthése";  
    
    $scope.$on('DateChange', function (events, args) {
        if (!args || (args && !args.IsOnlyMonthChange)) {
            $scope.getCurrentBankStatement();
            $scope.getCurrentScales();
        }
    });
    
    $scope.setMonth = function (index) {
        var dateChanged = (PersistentDataService.date.month !== index);
        $rootScope.currentDate.month = index;
        PersistentDataService.date = $rootScope.currentDate;
        dateChanged && $rootScope.$broadcast('DateChange', { IsOnlyMonthChange : true });
    }    
    
    $scope.getCurrentScales = function () {
        $scope.isLoadingScales = true;
        ApiService.Scales.get({ params: { 'year' : $rootScope.currentDate.year } }, function (res) {
=======
=======
>>>>>>> origin/master
﻿myApp.controller("HomeCtrl", function ($scope, ApiService, Ressources, HelperService, PersistentDataService) {
    $scope.name = "Synthése";  
    
    if (!PersistentDataService.date) {
        var now = new Date()
        $scope.currentDate = { month  : now.getMonth(), year : now.getFullYear() };
    } else {
        $scope.currentDate = PersistentDataService.date;
    }
    
    var year = $scope.currentDate.year;
    
    $scope.$on('DateChange', function (events, args) {
        $scope.currentDate = args;
        if (year !== $scope.currentDate.year) {
            $scope.getCurrentBankStatement();
            $scope.getCurrentScales();
        }
        year = $scope.currentDate.year;
    })
    
    
    $scope.getCurrentScales = function () {
        ApiService.Scales.get({ params: { 'year' : $scope.currentDate.year } }, function (res) {
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
            if (res.message.length === 9) {
                $scope.isScale = true;
            } else {
                $scope.isScale = false;
            }
<<<<<<< HEAD
<<<<<<< HEAD
            $scope.isLoadingScales = false;
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
        }, function (err) {
            console.log(err);
        });
    }
    
    $scope.getCurrentBankStatement = function () {
<<<<<<< HEAD
<<<<<<< HEAD
        $scope.isLoadingBankStatements = true;
        ApiService.BankStatement.get({ params: { 'date.year' : $rootScope.currentDate.year } }, function (res) {
            var currentBankStatement = res.message;
            $scope.isLoadingBankStatements = false;
=======
        ApiService.BankStatement.get({ params: { 'date.year' : $scope.currentDate.year } }, function (res) {
            var currentBankStatement = res.message;
>>>>>>> origin/master
=======
        ApiService.BankStatement.get({ params: { 'date.year' : $scope.currentDate.year } }, function (res) {
            var currentBankStatement = res.message;
>>>>>>> origin/master
            $scope.synthesis = [];
            var now = new Date()
            for (current in $scope.months) {
                var ligne = {};
<<<<<<< HEAD
<<<<<<< HEAD
                if ($rootScope.currentDate.year === now.getFullYear() && current > now.getMonth()) {
=======
                if ($scope.currentDate.year === now.getFullYear() && current > now.getMonth()) {
>>>>>>> origin/master
=======
                if ($scope.currentDate.year === now.getFullYear() && current > now.getMonth()) {
>>>>>>> origin/master
                    ligne = { month : $scope.months[current], statut : undefined, color : 'default' , etat : 'Hors Date' };
                } else {
                    ligne = { month : $scope.months[current], statut : -1, color : 'red' , etat : 'A faire' };
                    for (statement in currentBankStatement) {
                        if (currentBankStatement[statement].date.month - 1 == current) {
                            ligne.statut = currentBankStatement[statement].status !== undefined ? currentBankStatement[statement].status : -1;
                            switch (ligne.statut) {
                                case 0:
                                case 1:
                                case 2:
                                    ligne.etat = 'En cours';
                                    ligne.color = 'yellow';
                                    break;
                                case 3:
                                    ligne.etat = 'Exercice cloturé';
                                    ligne.color = 'green';
                                    break;
                                default:
                                    ligne.etat = 'A faire';
                                    ligne.color = 'red';
                                    break;
                            }
                        }
                    }
                }
                $scope.synthesis.push(ligne);
            }
        }, function (err) {
            console.log(err);
        });
    };
    
    $scope.getCurrentBankStatement();
    $scope.getCurrentScales();

});
