var myApp = angular.module('myApp');

//var myApp = angular.module('myApp',['ngMaterial']);

myApp.controller('RoomDataController', ['$scope', '$http', '$location', '$routeParams', '$rootScope','SessionService', function($scope, $http, $location, $routeParams,$rootScope,SessionService){
	console.log('roomDataController loaded...');

SessionService.runInitialSetUp();
$scope.formEditMode = false ; // during page load form will be on view mode.
$scope.formEditButtonText = "Edit"; 



$scope.room ={};
$scope.room.owner_details={};
$scope.room.owner_details.current =[];
$scope.room.owner_details.previous=[];

$scope.room.rent_details={};
$scope.room.rent_details.current =[];
$scope.room.rent_details.previous=[];

$scope.room.others={};
$scope.room.others.othersLiving =[];

$scope.date = new Date();

$scope.dateOptions = {
    dateDisabled: false,
    formatYear: 'yy',
    maxDate: new Date(2049, 12, 31),
    minDate: new Date(1900,1,1),
    startingDay: 1
  };

/*// Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }*/

 
//control date pop up 

$scope.popUpPrevOwnerFromDate =[];
$scope.popUpPrevOwnerToDate =[];
$scope.popUpCurrRentFromDate=[];
$scope.popUpPrevRentFromDate=[];
$scope.popUpPrevRentToDate=[];

$scope.openPopUpPrevOwnerFromDate =function(){
	$scope.popUpPrevOwnerFromDate[this.$index].opened = true;	
	console.log($scope.popUpPrevOwnerFromDate);
}

$scope.openPopUpPrevOwnerToDate =function(){
	$scope.popUpPrevOwnerToDate[this.$index].opened = true;	
}

$scope.openPopUpCurrRentFromDate =function(){
	$scope.popUpCurrRentFromDate[this.$index].opened = true;	
}

$scope.openPopUpPrevRentFromDate =function(){
	$scope.popUpPrevRentFromDate[this.$index].opened = true;	
}

$scope.openPopUpPrevRentToDate =function(){
	$scope.popUpPrevRentToDate[this.$index].opened = true;	
}





//get the building id from the url
$scope.buildingId = $routeParams._buildingId;
console.log('buildingId set :'+$routeParams._buildingId);
$scope.roomId = $routeParams._roomId;

$scope.measurementAreaUnit= "Sq.ft.";
$scope.selectedTowerId = null;
$scope.selectedTowerName =null;
 //$scope.buildingName = $rootScope.building.name;
 //console.log($rootScope);

$scope.building =null;


//get details of the building
 $scope.getBuildingById = function(){
		console.log('getBuildingById called for :'+$scope.buildingId);
		$http.get('/aptmgmt/api/masterdata/building/'+$scope.buildingId).then(function(response){			
			
			var building = response.data;
			console.log(building);
			$scope.building = building;
		});
	};

//get list of towers -/aptmgmt/api/masterdata/building/:buildingId/towers

$scope.getTowersByBuildingId= function(){

	console.log('getTowersByBuildingId called for building Id :'+$scope.buildingId);
		$http.get('/aptmgmt/api/masterdata/building/'+$scope.buildingId+'/towers').then(function(response){			
			console.log(response.data);
			$scope.towers = response.data;
			if($scope.towers.length ==1){
				console.log('tower size is 1');
				//$scope.selectedTower = $scope.towers[0]._id;
				
			}
			/*else{
				var selectAllOption = {"_id":"","name":"--All Towers--"}; 
				$scope.towers.unshift(selectAllOption);
			}*/

			//$scope.selectedTower = $scope.towers[0]._id;
			if($scope.buildingId){
				$scope.selectedTowerId = $scope.towers[0]._id;
			}
		});

}







$scope.$watch('selectedTowerId',function(){
	console.log('variable watcher called');
	console.log('selected tower id is :'+$scope.selectedTowerId);
	if($scope.selectedTowerId != null){
		for (var i = 0; i < $scope.towers.length ; i++) {
			console.log($scope.towers[i]._id +'-'+$scope.towers[i].name);
			if($scope.towers[i]._id == $scope.selectedTowerId){				
				$scope.selectedTowerName =$scope.towers[i].name;
				break;

			}
		}
		$scope.getRoomsByTower();
	}
	
});

$scope.addCurrentOwner= function(){
		console.log("add currentOwner called");
		
		$scope.room.owner_details.current.push("");
	};

$scope.deleteCurrentOwner= function(){
		console.log("delete current Owner called");
		
		$scope.room.owner_details.current.splice(this.$index,1);
	};

$scope.addPreviousOwner= function(){
		console.log("add PreviousOwner called");
		$scope.popUpPrevOwnerFromDate.push({opened:false});
		$scope.popUpPrevOwnerToDate.push({opened:false});
		$scope.room.owner_details.previous.push("");
		//console.log($scope.room);
	};

$scope.deletePreviousOwner= function(){
		console.log("delete Previous Owner called");
		$scope.popUpPrevOwnerFromDate.splice(this.$index,1);
		$scope.popUpPrevOwnerToDate.splice(this.$index,1);
		$scope.room.owner_details.previous.splice(this.$index,1);
		
	};

$scope.addCurrentRent= function(){
		console.log("add currentRent called");
		$scope.popUpCurrRentFromDate.push({opened:false});
		$scope.room.rent_details.current.push("");
	};

$scope.deleteCurrentRent= function(){
		console.log("delete current Rent called");
		$scope.room.rent_details.current.splice(this.$index,1);
	};

$scope.addPreviousRent= function(){
		console.log("add PreviousRent called");
		$scope.popUpPrevRentFromDate.push({opened:false});
		$scope.popUpPrevRentToDate.push({opened:false});
		$scope.room.rent_details.previous.push("");
	};

$scope.deletePreviousRent= function(){
		console.log("delete Previous Rent called");
		$scope.room.rent_details.previous.splice(this.$index,1);
		
	};
$scope.addOthersLiving= function(){
		console.log("add Others Living");
		$scope.room.others.othersLiving.push("");
	};

$scope.deleteOthersLiving= function(){
		console.log("delete Others living");
		$scope.room.others.othersLiving.splice(this.$index,1);
		
	};

$scope.addRoom= function(){
	console.log("add room function called");
	$scope.roomAdd.$setPristine();//the form is submitted, so reset to pristine

	$scope.room.building = $scope.buildingId;
	$scope.room.tower = $scope.selectedTowerId;
	$scope.room.area_details.measurementUnit = $scope.measurementAreaUnit;
	console.log($scope.room);


	$http.post('/aptmgmt/api/masterdata/building/tower/room', $scope.room).then(function(response){
			console.log(response);
			console.log('-------'+response.data.status+" : "+response.data.message);
			var statusCode = "F";
			
			if(response.data.status < 400)
			{
				statusCode= "S";
			}

			$scope.response = {
				"status":statusCode,
				"message":response.data.message
			};
			
		});
};

$scope.getRoomsByTower=function(){
	console.log('getRoomsByTower called for '+$scope.selectedTowerId);
	$http.get('/aptmgmt/api/masterdata/building/tower/'+$scope.selectedTowerId+'/rooms').then(function(response){
		console.log(response);
		$scope.rooms = response.data;

	});
};

$scope.getRoomById = function(){
	console.log('getRoomById() called for room Id:'+$scope.roomId);
	$http.get('/aptmgmt/api/masterdata/building/tower/room/'+$scope.roomId).then(function(response){
		console.log(response.data);
		$scope.room = response.data;
		
		$scope.buildingId = $scope.room.building;
		$scope.getTowersByBuildingId();

		//$scope.selectedTowerId = $scope.room.tower;


		console.log($scope.room);
	});
};

$scope.editForm = function(){
	
	if($scope.formEditMode == false){
		$scope.formEditButtonText = "Cancel Edit";
		$scope.formEditMode = true;

		//owner_details  may be edited - copy the original owner  to the selected value so that they can 
		//be displayed in the typeahead dropdown
		for (var i =0; i<$scope.room.owner_details.current.length; i++) {

			$scope.room.owner_details.current[i].userDetails={};
			
			$scope.room.owner_details.current[i].userDetails._id = $scope.room.owner_details.current[i]._id
			$scope.room.owner_details.current[i].userDetails.name =$scope.room.owner_details.current[i].name;

		}
		return;
	}

	if($scope.formEditMode == true){

		$scope.formEditButtonText = "Edit";
		$scope.formEditMode = false; 
		return;
	}
};


$scope.getMembersOfBuilding = function(name){	
return $http.get('/aptmgmt/api/users/name/'+name).then(function(response){
	console.log(response.data);
	return response.data;
})};

$scope.updateRoom = function(){
	//console.log($scope.room);
	$scope.restructureRoomDetail();
	//make http call
	$http.put('/aptmgmt/api/masterdata/building/tower/room/'+$scope.room._id, $scope.room).then(function(response){
			console.log("finished http call");
			console.log(response.data.status+" : "+response.data.message);
			var statusCode = "F";
			
			if(response.data.status < 400)
			{
				statusCode= "S";
			}

			$scope.response = {
				"status":statusCode,
				"message":response.data.message
			};

			//call the getBuildingById method to refresh the building data from backend
			$scope.getRoomById();
			$scope.formEditMode =false;
			$scope.formEditButtonText ="Edit";
			
		});


};

$scope.restructureRoomDetail = function(){
	console.log($scope.room.owner_details.current.length);
	if($scope.room.owner_details.current.length >0){
		for (var i = 0; i<$scope.room.owner_details.current.length; i++) {
			console.log("inside loop");
			if($scope.room.owner_details.current[i].userDetails){
				delete $scope.room.owner_details.current[i].id;
				$scope.room.owner_details.current[i]._id= $scope.room.owner_details.current[i].userDetails._id;
				delete $scope.room.owner_details.current[i].userDetails;

			}
			

		}
	}
	console.log($scope.room);
};

}]);