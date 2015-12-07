myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory', 'Ressources', 'HelperService', 'PersistentDataService',
  function ($scope, $window, $location, UserAuthFactory, AuthenticationFactory, Ressources, HelperService, PersistentDataService) {
        
        $scope.login = function (userObject) {
            this.loginForm.reset();
            $scope.isLoggingIn = true;
            UserAuthFactory.login(userObject.email, userObject.password).success(function (data) {
                    
                AuthenticationFactory.isLogged = true;
                AuthenticationFactory.user = data.user;
                    
                PersistentDataService.token = data.token;
                PersistentDataService.user = data.user; // to fetch the user details on refresh
                PersistentDataService.date = { month  : (new Date()).getMonth() + 1, year : (new Date()).getFullYear() };
                    
                $location.path("/");
                $scope.isLoggingIn = false;
 
            }).error(function (status) {
                $scope.authError = true;
                $scope.isLoggingIn = false;
            });
        };

        $scope.clearAuthError = function () { $scope.authError = false; };
    }
]);