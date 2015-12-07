myApp.controller("HeaderCtrl", function ($scope, $rootScope, $location, Ressources, UserAuthFactory, PersistentDataService, config) {
        $scope.isActive = function (route) {
            return route === $location.path();
        }
        $scope.logout = function () {
            UserAuthFactory.logout();
        }
        
        if (PersistentDataService.user) {
            var currentUser = PersistentDataService.user;
            $scope.userName = currentUser.firstname + ' ' + currentUser.lastname;
<<<<<<< HEAD
<<<<<<< HEAD
            $scope.isAdmin = (PersistentDataService.user.role === 1);    
=======
=======
>>>>>>> origin/master
            if (currentUser.role == 1) {
                $scope.isAdmin = true;
            } else {
                $scope.isAdmin = false;
            }
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
        }
        
        var now = new Date()

        $scope.years = new Array();
        for (var i = config.init.year; i <= now.getFullYear(); i++) {
            $scope.years.push(i);
        }
 
<<<<<<< HEAD
<<<<<<< HEAD
    $scope.setCurrentDate = function () {
        var monthChanged = (PersistentDataService.date.month !== now.getMonth() + 1);
        var yearChanged = (PersistentDataService.date.year !== now.getFullYear());
        var dateChanged = (monthChanged || yearChanged);
        $rootScope.currentDate = { month  : now.getMonth() + 1, year : now.getFullYear() };    
        PersistentDataService.date = $rootScope.currentDate;
        
        dateChanged && $rootScope.$broadcast('DateChange', monthChanged && !yearChanged ? { IsOnlyMonthChange : true } : undefined);
        }

        $scope.setMonth = function (index) {
        var dateChanged = (PersistentDataService.date.month !== index);
        $rootScope.currentDate.month = index;
        PersistentDataService.date = $rootScope.currentDate;
        dateChanged && $rootScope.$broadcast('DateChange', {IsOnlyMonthChange : true});
        }
        
        $scope.setYear = function (index) {
        var dateChanged = (PersistentDataService.date.year !== index);
        $rootScope.currentDate.year = index;
        PersistentDataService.date = $rootScope.currentDate; 
        dateChanged && $rootScope.$broadcast('DateChange');
=======
=======
>>>>>>> origin/master
    if (!PersistentDataService.date) {
            $scope.currentDate = { month  : now.getMonth(), year : now.getFullYear() };
            PersistentDataService.date = $scope.currentDate;
        } else {
            $scope.currentDate = PersistentDataService.date;
            $rootScope.$broadcast('DateChange', $scope.currentDate);
        }
        
        $scope.setCurrentDate = function () {
            $scope.currentDate.month = now.getMonth();
            $scope.currentDate.year = now.getFullYear();
            PersistentDataService.date = $scope.currentDate;
            $rootScope.$broadcast('DateChange', $scope.currentDate);
        }

        $scope.setMonth = function (index) {
            $scope.currentDate.month = index;
            PersistentDataService.date = $scope.currentDate;
            $rootScope.$broadcast('DateChange', $scope.currentDate);
        }
        
        $scope.setYear = function (index) {
            $scope.currentDate.year = index;
            PersistentDataService.date = $scope.currentDate;
            $rootScope.$broadcast('DateChange', $scope.currentDate);
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
        }
});