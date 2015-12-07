<<<<<<< HEAD
<<<<<<< HEAD
﻿var myApp = angular.module('ngclient', ['ngRoute', 'smart-table', 'angularValidator', 'ngResource', 'angular.filter', 'ngAnimate', 'angularSpinner']);

myApp.config(function ($routeProvider, $httpProvider, $resourceProvider, config, $animateProvider, usSpinnerConfigProvider) {
=======
﻿var myApp = angular.module('ngclient', ['ngRoute', 'smart-table', 'angularValidator', 'ngResource', 'angular.filter', 'ngAnimate']);

myApp.config(function ($routeProvider, $httpProvider, $resourceProvider, config, $animateProvider) {
>>>>>>> origin/master
=======
﻿var myApp = angular.module('ngclient', ['ngRoute', 'smart-table', 'angularValidator', 'ngResource', 'angular.filter', 'ngAnimate']);

myApp.config(function ($routeProvider, $httpProvider, $resourceProvider, config, $animateProvider) {
>>>>>>> origin/master

    $httpProvider.interceptors.push('TokenInterceptor');
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $resourceProvider.defaults.actions.get = { method: "GET"};    
    $resourceProvider.defaults.actions.delete = { method: "DELETE" };
    $resourceProvider.defaults.actions.query = { method: "GET"};
    $resourceProvider.defaults.actions.remove = { method: "DELETE"};
    $resourceProvider.defaults.actions.save = { method: "POST"};
    $resourceProvider.defaults.actions.update = { method: "PUT" };
     
    angular.forEach(config.routes, function (r) {
<<<<<<< HEAD
<<<<<<< HEAD
        $routeProvider.when(r.RouteUrl, r);
=======
        $routeProvider.when(r.RouteUrl, { templateUrl: r.templateUrl, controller: r.controller, access: r.access});
>>>>>>> origin/master
=======
        $routeProvider.when(r.RouteUrl, { templateUrl: r.templateUrl, controller: r.controller, access: r.access});
>>>>>>> origin/master
    });
    $routeProvider.otherwise({
        redirectTo: '/login'
    });

    $animateProvider.classNameFilter(/animate-this/);
<<<<<<< HEAD
<<<<<<< HEAD
    usSpinnerConfigProvider.setTheme('easy16i-panel', { color: '#41687D', radius: 8, width: 4, length: 7 });
    usSpinnerConfigProvider.setTheme('easy16i-input', { color: '#41687D', radius: 5, width: 2, length: 4 });
    usSpinnerConfigProvider.setTheme('easy16i-login', { color: '#FFF', radius: 5, width: 2, length: 4 });
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
});

myApp.run(function ($rootScope, $window, $location, AuthenticationFactory, config, PersistentDataService, $locale, Ressources) {
    // when the page refreshes, check if the user is already logged in
    AuthenticationFactory.check();
    
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
            $location.path("/login");
        }
        else if (nextRoute.access && nextRoute.access.requiredAdmin && PersistentDataService.user.role != 1){
            $location.path("/home");
        }
        else {
            // check if user object exists else fetch it. This is incase of a page refresh
            if (!AuthenticationFactory.user) AuthenticationFactory.user = PersistentDataService.user;
        }
    });
    
    $rootScope.$on('$routeChangeSuccess', function (event, nextRoute, currentRoute) {
        $rootScope.showMenu = AuthenticationFactory.isLogged;
        if (typeof AuthenticationFactory.user != "undefined") {
            $rootScope.role = AuthenticationFactory.user.role;
        }      
        // if the user is already logged in, take him to the home page
        if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
            $location.path('/');
        }
    });

    PNotify.prototype.options.styling = "bootstrap3";   //sets theme for all our PNotify alerts

    $rootScope.config = config;
    $rootScope.months = $locale.DATETIME_FORMATS.MONTH;
    $rootScope.validationMessages = Ressources.validation;
    $rootScope.ressourcesMessages = Ressources.messages;
<<<<<<< HEAD
<<<<<<< HEAD
    if (!PersistentDataService.date)
        PersistentDataService.date = { month  : (new Date()).getMonth() + 1, year : (new Date()).getFullYear() };
    $rootScope.currentDate = PersistentDataService.date;
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
});