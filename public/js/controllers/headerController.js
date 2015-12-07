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
            $scope.isAdmin = (PersistentDataService.user.role === 1);    
        }
        
        var now = new Date()

        $scope.years = new Array();
        for (var i = config.init.year; i <= now.getFullYear(); i++) {
            $scope.years.push(i);
        }
 
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
        }
});