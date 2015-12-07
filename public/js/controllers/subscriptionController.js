myApp.controller("SubscriptionCtrl", function ($scope, ApiService, Ressources, HelperService, PersistentDataService, config) {
    $scope.name = "User";
    $scope.rolelist = {
        selectedOption: { id: '2', name: 'Utilisateur' },
        availableOptions: [{ id: '1', name: 'Administrateur' },
                                    { id: '2', name: 'Utilisateur' }]
    };
    $scope.currentUser = PersistentDataService.user;
    $scope.createNewUser = function (userObject) {
        
        this.subscriptionForm.reset();
        var user = new ApiService.User(userObject);
        
        user.$save(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.add, res.message.email);
            $scope.listUsers();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.add, err.data.errormessage);
        });
    }
<<<<<<< HEAD
<<<<<<< HEAD

    $scope.deleteUser = function (userObject) {
        var user = new ApiService.User(userObject);
        user.deleted = 1;
        userObject.isBeingModified = true;
        user.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.delete, res.message.email);
            $scope.listUsers(true);            
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.delete, err.data.errormessage);            
        });
    }
    
    $scope.UndoDeleteUser = function (userObject) {
        var user = new ApiService.User(userObject);
        user.deleted = 0;
        userObject.isBeingModified = true;
        user.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.email);
            $scope.listUsers(true);
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
        });
    }
    
    $scope.listUsers = function (noLoader) {
        if (!noLoader)
            $scope.isLoadingUsers = true;

        ApiService.User.get(function (res) {
            $scope.userList = res.message;
            $scope.itemsByPage = 10;
            $scope.isLoadingUsers = false;
=======
=======
>>>>>>> origin/master
    
    $scope.deleteUser = function (userObject) {
        var user = new ApiService.User();
        user.$delete({ params: { 'idList' : [].concat(userObject._id) } }, function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.delete, res.message.email);
            $scope.listUsers();
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.delete, err.data.errormessage);
        });
    }
    
    $scope.listUsers = function () {
        ApiService.User.get(function (res) {
            $scope.userList = res.message;
            $scope.itemsByPage = 10;
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
        }, function (err) {
            console.log(err);
        });
    }
    
    $scope.listUsers();
    
    $scope.passwordValidator = function (password) {
        
        if (!password) {
            return;
        }
        else if (password.length < 6) {
            return HelperService.stringFormat(Ressources.validation.passwordLackChars, "6");
        }
        
        return true;
    };
    
    $scope.displayedUserList = [].concat($scope.userList);
    $scope.itemsByPage = 10;
             
});