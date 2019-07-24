var myApp = angular.module('myApp');

myApp.controller('MasterDataController', ['$scope', '$http', '$location', '$routeParams','SessionService', function($scope, $http, $location, $routeParams,SessionService){
	console.log('MasterDataController loaded...');

SessionService.runInitialSetUp(false);


$scope.getMasterDataCategories = function(){
	console.log('getMasterDataCategories called');
		$http.get('/aptmgmt/api/masterdata/categories').then(function(response){
			$scope.masterdataL = response.data;			
			console.log('got response');
		});

	}
	

}]);