myApp.factory('ApiService', function ($http, $resource, config) {
<<<<<<< HEAD
<<<<<<< HEAD
    var resources = {
        User            : $resource(config.userApiUrl + '/:id', { id: '@_id' }),                    
        Accomodation    : $resource(config.accomodationApiUrl + '/:id', { id: '@_id' }),
        NatureSpending  : $resource(config.natureSpendingApiUrl + '/:id', { id: '@_id' }), 
        Spending        : $resource(config.spendingApiUrl + '/:id', { id: '@_id' }), 
        Scales          : $resource(config.scalesApiUrl + '/:id', { id: '@_id' }, { get: { url: config.scalesApiUrl.replace("admin/", "") } }),             
        BankStatement   : $resource(config.bankStatementApiUrl + '/:id', { id: '@_id' }),                 
        Recipe          : $resource(config.recipeApiUrl + '/:id', { id: '@_id' }),
        Vehicle         : $resource(config.vehicleApiUrl + '/:id', { id: '@_id' }),
        Km              : $resource(config.kmApiUrl + '/:id', { id: '@_id' })
    }
    return resources;
=======
=======
>>>>>>> origin/master
        return {
            User         : $resource(config.userApiUrl + '/:id', { id: '@_id' }),                    
            Accomodation : $resource(config.accomodationApiUrl + '/:id', { id: '@_id' }),
            Spending     : $resource(config.spendingApiUrl + '/:id', { id: '@_id' }), 
            Scales       : $resource(config.scalesApiUrl + '/:id', { id: '@_id' }),             
            BankStatement: $resource(config.bankStatementApiUrl + '/:id', { id: '@_id' }),                 
            Recipe       : $resource(config.recipeApiUrl + '/:id', { id: '@_id' }),
            Vehicle      : $resource(config.vehicleApiUrl + '/:id', { id: '@_id' }),
            Km           : $resource(config.kmApiUrl + '/:id', { id: '@_id' })                  
        }
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
});