myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory', 'Ressources', 'HelperService', 'PersistentDataService',
  function ($scope, $window, $location, UserAuthFactory, AuthenticationFactory, Ressources, HelperService, PersistentDataService) {
        
<<<<<<< HEAD
<<<<<<< HEAD
        $scope.login = function (userObject) {
            this.loginForm.reset();
            $scope.isLoggingIn = true;
=======
        $scope.login = function (userObject) {            
            this.loginForm.reset();
>>>>>>> origin/master
=======
        $scope.login = function (userObject) {            
            this.loginForm.reset();
>>>>>>> origin/master
            UserAuthFactory.login(userObject.email, userObject.password).success(function (data) {
                    
                AuthenticationFactory.isLogged = true;
                AuthenticationFactory.user = data.user;
                    
                PersistentDataService.token = data.token;
                PersistentDataService.user = data.user; // to fetch the user details on refresh
<<<<<<< HEAD
<<<<<<< HEAD
                PersistentDataService.date = { month  : (new Date()).getMonth() + 1, year : (new Date()).getFullYear() };
                    
                $location.path("/");
                $scope.isLoggingIn = false;
 
            }).error(function (status) {
                $scope.authError = true;
                $scope.isLoggingIn = false;
=======
=======
>>>>>>> origin/master
                    
                $location.path("/");
 
            }).error(function (status) {
                $scope.authError = true;
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
            });
        };

        $scope.clearAuthError = function () { $scope.authError = false; };
    }
]);