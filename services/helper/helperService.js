var _helperService = {
    
    sendResponse : function (status, responseObj, res) {
<<<<<<< HEAD
<<<<<<< HEAD
        if (status) {
            responseObj.status = status;
            res.status(status);
        }
       res.json(responseObj);
      // setTimeout((function () { res.json(responseObj); }), 1000);
=======
        responseObj.status = status;
        res.status(status);
        res.json(responseObj);
>>>>>>> origin/master
=======
        responseObj.status = status;
        res.status(status);
        res.json(responseObj);
>>>>>>> origin/master
    },

    validation: {
        isValidUser : function (user) {
<<<<<<< HEAD
<<<<<<< HEAD
            return (user !== undefined && user.email !== undefined && user.role !== undefined &&
                     user.firstname !== undefined && user.lastname !== undefined)
=======
            return (user !== undefined && user.email !== undefined && user.password !== undefined &&
                     user.role !== undefined && user.firstname !== undefined && user.lastname !== undefined)
>>>>>>> origin/master
=======
            return (user !== undefined && user.email !== undefined && user.password !== undefined &&
                     user.role !== undefined && user.firstname !== undefined && user.lastname !== undefined)
>>>>>>> origin/master
        },
        isValidAccomodation : function (obj) {
            return (obj !== undefined && obj.name !== undefined && obj.address !== undefined &&
                     obj.city !== undefined && obj.country !== undefined)
        },
        isValidScale : function (obj) {
            return (obj !== undefined && obj.year !== undefined && obj.cv !== undefined &&
                     obj.interval !== undefined && obj.interval.t1 !== undefined && obj.interval.t1.from !== undefined &&
                     obj.interval.t1.to !== undefined && obj.interval.t1.rate !== undefined && obj.interval.t1.constant !== undefined &&
                     obj.interval.t2 !== undefined && obj.interval.t2.from !== undefined && obj.interval.t2.to !== undefined &&
                     obj.interval.t2.rate !== undefined && obj.interval.t2.constant !== undefined && obj.interval.t3 !== undefined &&
                     obj.interval.t3.from !== undefined && obj.interval.t3.to !== undefined && obj.interval.t3.rate !== undefined && 
                     obj.interval.t3.constant !== undefined)
        },
        isValidSpending : function (obj) {
            return (obj !== undefined && obj.date !== undefined && obj.date.year !== undefined &&
<<<<<<< HEAD
<<<<<<< HEAD
                     obj.date.month !== undefined && obj.num_justification !== undefined &&
                     obj.modePayment !== undefined && obj.spend !== undefined && obj.gite !== undefined && obj.amount !== undefined)
        },
        isValidNatureSpending: function (obj) {
            return ((obj !== undefined && obj.name !== undefined && (obj.min === undefined || obj.max === undefined)) || 
                    (obj !== undefined && obj.name !== undefined && obj.min !== undefined && obj.max !== undefined && obj.max >= obj.min))
        },
        isValidRecipe : function (obj) {
            return (obj !== undefined && obj.date !== undefined && obj.date.year !== undefined &&
                     obj.date.month !== undefined && obj.num_justification !== undefined && 
=======
=======
>>>>>>> origin/master
                     obj.date.month !== undefined && obj.num_justification !== undefined && obj.date_operation !== undefined &&
                     obj.modePayment !== undefined && obj.spend !== undefined && obj.gite !== undefined && obj.amount !== undefined)
        },
        isValidRecipe : function (obj) {
            return (obj !== undefined && obj.date !== undefined && obj.date.year !== undefined &&
                     obj.date.month !== undefined && obj.num_justification !== undefined && obj.date_operation !== undefined &&
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
                     obj.modePayment !== undefined && obj.recipe !== undefined && obj.gite !== undefined && obj.amount !== undefined)
        },
        isValidVehicle : function (obj) {
            return (obj !== undefined && obj.immatriculation !== undefined && obj.cv !== undefined &&
                     obj.type !== undefined )
        },
        isValidKm : function (obj) {
            return (obj !== undefined && obj.date !== undefined && obj.date.year !== undefined &&
                     obj.date.month !== undefined && obj.num_justification !== undefined && obj.vehicle !== undefined &&
                     obj.modePayment !== undefined && obj.date_travel !== undefined && obj.gite !== undefined && 
                     obj.km !== undefined && obj.start_place !== undefined && obj.finish_place !== undefined)
        },              
        isValidBankStatement : function (bankstatement) {
            return (bankstatement !== undefined && bankstatement.date !== undefined && bankstatement.date.year !== undefined &&
                     bankstatement.date.month !== undefined && bankstatement.endbalance !== undefined && bankstatement.startbalance !== undefined)
        }

    }
};

module.exports = _helperService;