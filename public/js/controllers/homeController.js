myApp.controller("HomeCtrl", function ($scope, $rootScope, ApiService, Ressources, HelperService, PersistentDataService) {
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
            if (res.message.length === 9) {
                $scope.isScale = true;
            } else {
                $scope.isScale = false;
            }
            $scope.isLoadingScales = false;
        }, function (err) {
            console.log(err);
        });
    }
    
    $scope.getCurrentBankStatement = function () {
        $scope.isLoadingBankStatements = true;
        ApiService.BankStatement.get({ params: { 'date.year' : $rootScope.currentDate.year } }, function (res) {
            var currentBankStatement = res.message;
            $scope.isLoadingBankStatements = false;
            $scope.synthesis = [];
            var now = new Date()
            for (current in $scope.months) {
                var ligne = {};
                if ($rootScope.currentDate.year === now.getFullYear() && current > now.getMonth()) {
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
