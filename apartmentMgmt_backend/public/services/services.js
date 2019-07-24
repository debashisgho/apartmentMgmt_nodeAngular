var myapp = angular.module('myapp', []);

myApp.service('SessionService', function($http,$location,$rootScope) {
    this.getLogInDetails = function () { 
    	console.log('SessionService called');
        return $http.get('/aptmgmt/api/user/session/isLoggedIn')
        .then(function(response){
        	return response.data.user;
        });      
    };

   /* this.redirectIfNotLoggedIn = function(){
    	var logOnDetailsPromise = this.getLogInDetails();
		logOnDetailsPromise
		.then(function(data){	
		var user= data;	
		if(angular.isUndefined(user) || user==null){
			console.log('/public/services/services.js -not logged in');
			$location.url("/aptmgmt");	

		}
		else{
			console.log('/public/services/services.js -already logged in ');
			$rootScope.user = user;
			
		}
	});
    }*/


    this.runInitialSetUp = function(redirectIfNotLoggedInFlag, setUpRootScopeFlag){


		//STOP AUTHENTICATION FOR DEVELOPMENT

		redirectIfNotLoggedInFlag=false;


    	if(angular.isUndefined(redirectIfNotLoggedInFlag)|| redirectIfNotLoggedInFlag == null){
    		console.log("setting redirect flag to true");
    		redirectIfNotLoggedInFlag = true;
    	}

    	if(angular.isUndefined(setUpRootScopeFlag)|| setUpRootScopeFlag ==null){
    		setUpRootScopeFlag = true;
    	}

    var logOnDetailsPromise = this.getLogInDetails();
	logOnDetailsPromise
	.then(function(data){	
		var user= data;	
		if(angular.isUndefined(user) || user==null){
			console.log('/public/services/services.js -not logged in');
			if(redirectIfNotLoggedInFlag){
				console.log('going to redirect');
				$location.url("/aptmgmt");	
			}
			

		}
		else{
			console.log('/public/services/services.js -already logged in ');
			if(setUpRootScopeFlag){
				$rootScope.user = user;
			}
			
		}
	});


    }

});