myApp.controller("MappingCtrl", function ($scope, $rootScope, Ressources, HelperService, ApiService, PersistentDataService, config) {
        $scope.name = "Relevebancaire";
                
        $scope.$on('DateChange', function (events, args) {
            $scope.getCurrentBankStatement();
        });       
   
        $scope.selections = {
            availableOptions: [{ id: '0', name: '' }],
            selectedOption: []
        };

        $scope.displayedStatementLineList = [].concat($scope.selectedSheet);
        $scope.itemsByPage = 100;
        var compteurAttestation = 1;

        $scope.getCurrentBankStatement = function () {
            $scope.currentBankStatement = null;
            $scope.displayedStatementLineList = null;
            $scope.isLoadingBankStatement = true;

            ApiService.BankStatement.get({ params: { date : { 'year' : $rootScope.currentDate.year , 'month' : $rootScope.currentDate.month }}, getone : true }, function (res) {
                $scope.currentBankStatement = res.message;
                $scope.operationType = null;
                $scope.isLoadingBankStatement = false;
                if ($scope.currentBankStatement !== null && $scope.currentBankStatement !== undefined) {
                    //determine what type of operation to start based on statement status
                    switch ($scope.currentBankStatement.status.toString()) {
                        case Ressources.enums.statementStatus.KO:
                        case Ressources.enums.statementStatus.ONLY_DEBIT_OK:
                            $scope.operationType = "Crédit";
                            break;
                        case Ressources.enums.statementStatus.ONLY_CREDIT_OK:
                            $scope.operationType = "Débit";
                            break;
                        case Ressources.enums.statementStatus.OK:
                            $scope.operationType = "None";
                            break;
                        default:
                            break;
                    }
                    
                    $scope.displayedStatementLineList = [].concat($scope.currentBankStatement.transactions);                   
                    $scope.getCurrentJustifications();
                }
            }, function (err) { });
        };

        $scope.getCurrentJustifications = function () {
            $scope.justificationList = null;
            $scope.isLoadingJustifications = true;
            
            var matchingApiService = ($scope.operationType === "Crédit") ? ApiService.Recipe : ApiService.Spending;
            
            matchingApiService.get({ params: { 'date.year' : $rootScope.currentDate.year , 'date.month' : $rootScope.currentDate.month , 'deleted' : 0 } }, function (res) {
                $scope.justificationList = res.message;
                $scope.isLoadingJustifications = false;
            if ($scope.justificationList !== null && $scope.justificationList !== undefined) {
                $.each($scope.justificationList, function (i, justif) {
                    justif.friendlyname = HelperService.getJustificationFriendlyName(justif);
                });
                $.each($scope.currentBankStatement.transactions, function (i, t) {
                    if($scope.operationType === t.type){
                            $scope.selections.selectedOption[i] = $scope.selections.availableOptions[0]                ;
                            $.each($scope.justificationList, function (index, justif) {
                            if (t.affectation === justif._id)
                                $scope.selections.selectedOption[i] = justif;
                        });
                    }
                    });
                }
                $scope.displayedJustificationList = [].concat($scope.justificationList);  
            }, function (err) { });
        };

        $scope.getCurrentBankStatement();

        $scope.updateOptions = function (index) {
            if ($scope.selections.selectedOption[index] !== null && $scope.selections.selectedOption[index] !== undefined)
                $scope.currentBankStatement.transactions[index].affectation = $scope.selections.selectedOption[index]._id;
            //if ($scope.selections.selectedOption[index] === null)
            //    $scope.currentBankStatement.transactions[index].affectation = null;
        };

        $scope.isOptionDisabled = function (index) {
            return function (justif) {
                var isAlreadyAssigned = $scope.isAlreadyAssigned(justif);
                var isAssignedToCurrentTransaction = $scope.currentBankStatement.transactions[index].affectation === justif._id;
                var isMatchingAmount = $scope.currentBankStatement.transactions[index].amount === justif.amount;

                //to be eligible for affectation, justif must match amount + not already affected or if affected to current instance transaction
                return (isMatchingAmount && (!isAlreadyAssigned || (isAlreadyAssigned && isAssignedToCurrentTransaction)));
            };
        };

        $scope.isAlreadyAssigned = function (justif) { 
            var result = false;
            $.each($scope.currentBankStatement.transactions, function (i, t) {
                if (t.affectation === justif._id) {
                    result = true;
                    return false;
                }
            });
            return result;
        };

        $scope.checkExerciceIsValid = function () {
             return ($scope.allOperationsAreAssigned() && $scope.allJustificationsAreAssigned()) ? "btn btn - warning": "btn btn - warning disabled";
        };

        $scope.deleteSingleJustification = function (justificationObject) {
            var justificationListToRemove = [].concat(justificationObject._id);            
            deleteJustifications(justificationListToRemove);
        };
        
        $scope.deleteAllJustifications = function () {
            var justificationListToRemove = [];
            $.each($scope.justificationList, function (index, justif) {
                if (!$scope.isAlreadyAssigned(justif))
                    justificationListToRemove.push(justif._id);
            });
            deleteJustifications(justificationListToRemove);           
        };
        
        var deleteJustifications = function (justificationListToRemove) { 
            var matchingApiService = ($scope.operationType === "Crédit") ? ApiService.Recipe : ApiService.Spending;
            var justification = new matchingApiService();
            
            justification.$delete({ params: { 'idList' : justificationListToRemove } }, function (res) {
                HelperService.displayNotification(Ressources.enums.notification.success, '' , Ressources.enums.operation.delete, null);
                $scope.getCurrentJustifications();
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, '' , Ressources.enums.operation.delete, err.data.errormessage);
            });        
        };

        $scope.allJustificationsAreAssigned = function () {
            var result = false;
            if ($scope.justificationList) {
                result = true;
                $.each($scope.justificationList, function (i, justif) {
                    if (!$scope.isAlreadyAssigned(justif)) {
                        result = false;
                        return false;
                    }
                });
            }
            return result;
        };

        $scope.allOperationsAreAssigned = function () {
            var result = false;
            if ($scope.currentBankStatement && $scope.currentBankStatement.transactions) {
                result = true;
                $.each($scope.currentBankStatement.transactions, function (i, t) {
                    if (t.type === $scope.operationType && (t.affectation === undefined || t.affectation === null)) {
                        result = false;
                        return false;
                    }
                });
            }
            return result;
        };
                
        $scope.addJustification = function (transaction) {
            //first save current bank statement in its state
            var bankStatement = new ApiService.BankStatement($scope.currentBankStatement);
            bankStatement.$update(function (res) {
                //then redirect to either recette or depenses
                PersistentDataService.mappingOp = transaction;
                window.location.href = '#' + (($scope.operationType === "Crédit") ? config.routes.recipe.RouteUrl : config.routes.spending.RouteUrl);
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, 'Relevebancaire' , Ressources.enums.operation.update, err.data.errormessage);
            });
        };

        $scope.saveStatementAndContinue = function () { 
            //first save current bank statement in its state
            var bankStatement = new ApiService.BankStatement($scope.currentBankStatement);
        
        if (bankStatement.status.toString() === Ressources.enums.statementStatus.ONLY_CREDIT_OK)
            bankStatement.status = Ressources.enums.statementStatus.OK;
        else
            bankStatement.status = Ressources.enums.statementStatus.ONLY_CREDIT_OK;

            bankStatement.$update(function (res) {
                $scope.getCurrentBankStatement();
            }, function (err) {
                HelperService.displayNotification(Ressources.enums.notification.error, 'Relevebancaire' , Ressources.enums.operation.update, err.data.errormessage);
            });
        };

    $scope.selectOnlyOptionAvailable = function (i, justifList, transaction) {        
        if (justifList && justifList.length === 1 && $scope.selections.selectedOption[i] === $scope.selections.availableOptions[0] && !$scope.selections.selectedOption[i].forcedClear) {
            $scope.selections.selectedOption[i] = justifList[0];
            transaction.affectation = justifList[0]._id;
        }
    };

    $scope.tellNextScopeToRedirectBackHere = function() {
        PersistentDataService.mappingOp = true;
    };
    
    $scope.toNextMonth = function (Object , isAll) {
        var matchingApiService = ($scope.operationType === "Crédit") ? ApiService.Recipe : ApiService.Spending;
        if (Object.date.month === 12) {
            Object.date.year++;
            Object.date.month = 1;
        } else
            Object.date.month++;
        var objModel = new matchingApiService(Object);
        objModel.$update(function (res) {
            HelperService.displayNotification(Ressources.enums.notification.success, $scope.name , Ressources.enums.operation.update, res.message.num_justification);
            !isAll ? $scope.getCurrentJustifications() : null;
        }, function (err) {
            HelperService.displayNotification(Ressources.enums.notification.error, $scope.name , Ressources.enums.operation.update, err.data.errormessage);
        });
    };
    
    $scope.moveAllJustifications = function () {
        $.each($scope.justificationList, function (index, justif) {
            if (!$scope.isAlreadyAssigned(justif))
                $scope.toNextMonth(justif, true);
        });
        $scope.getCurrentJustifications();
    };
    
    $scope.dialogHtml = {
        title: 'Validation de transfert des piéces justificatives',
        body: 'Confirmer le transfert de la pièce justificative sur le mois prochain (car pas sur le relevé bancaire du mois)',
        info: 'NB : cette opération est irréversible'
    };
    
    $scope.dialogHtmlAll = {
        title: 'Validation de transfert de tous les piéces justificatif sur la liste',
        body: 'Vous étes sur de vouloir conserver tous les piéce justificatifs jusqu\'à le mois prochaine ?',
        info: 'NB : cette opération est irréversible',
        id: 'allJustif',
    };
    
    $scope.clearOption = function (i, transaction) {
        $scope.selections.selectedOption[i] = $scope.selections.availableOptions[0];
        $scope.selections.selectedOption[i].forcedClear = true;       
        $.each($scope.justificationList, function (i, justif) {
            if(transaction.affectation === justif._id && justif.isAttestation){
                $scope.justificationList.splice(i, 1);
            }
        });
        transaction.affectation = null;  
    };
   
    var compteurAttestation = 1

    $scope.dialogHtmlAttesttion = {
        title: 'Génératuer des attestations sur l\'honneur',
        body: 'Vous étes sur le point de justifier une opération avec une attestion sur l\'honneur ?',
        info: 'NB : vous pouvez annuler la justification avant de valider l\'exercice'
    };

    $scope.addAttestation = function (line) {
        var num = HelperService.stringFormat('{0}{1}A{2}', $rootScope.currentDate.year , HelperService.padLeft($rootScope.currentDate.month, 0 , 2), HelperService.padLeft(compteurAttestation, 0 , 3));
        var lineAttestation = { '_id' : num , 'num_justification' : num ,'friendlyname' : 'Attestation sur l\'honneur : ' + num, 'isAttestation' : true ,'amount' : line.amount};        
        $scope.justificationList.push(lineAttestation);
        line.affectation = lineAttestation._id;
        compteurAttestation++;
    }
});