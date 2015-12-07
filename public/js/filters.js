myApp.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
<<<<<<< HEAD
<<<<<<< HEAD
});

myApp.filter("sanitize", ['$sce', function ($sce) {
    return function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }
}]);
=======
});
>>>>>>> origin/master
=======
});
>>>>>>> origin/master
