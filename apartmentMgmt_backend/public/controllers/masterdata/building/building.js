var myApp = angular.module('myApp');

//var myApp = angular.module('myApp',['ngMaterial']);

myApp.controller('buildingDataController', ['$scope','$rootScope', '$http', '$location', '$routeParams','SessionService', function($scope,$rootScope, $http, $location, $routeParams,SessionService){
	console.log('BuildingDataController loaded...');

SessionService.runInitialSetUp();
$scope.formEditMode = false ; // during page load form will be on view mode.
$scope.formEditButtonText = "Edit"; 

//$scope.selectedCommitteeMembers=""; 

//$scope.selected = "";
//$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

//$scope.states =['Ghosh, Debashis','Guha, Swagata', 'Paul, Pallabi'];

/*$scope.states =[
{
	_id:1,
	fname:"Debashis",
	lname:'Ghosh'
	
},

{
	_id:2,
		fname:"Debashis1",
	lname:'Ghosh'
},

{
	_id:3,
		fname:"Debashis2",
	lname:'Ghosh'
}

];

*/

//Below is a hardcoded response to check whether typeahead is working or not
/*$scope.buildingMembers=[

{	
	name:{
		first:"Ghosh1",
		last:"Debashis1"
	},
	user_id:"58fced9a66928924e8db4501"

},

{
	name:{
		first:"Ghosh2",
		last:"Debashis2"
	},
	user_id:"58fced9a66928924e8db4502"

},

{
	name:{
		first:"Ghosh3",
		last:"Debashis3"
	},
	user_id:"58fced9a66928924e8db4503"
}

];*/


/*


$scope.getMembersOfBuilding = function(name){

	return $scope.states;

}*/

$scope.reStructureCommitteeMembers = function(){


	//console.log($scope.building.committeeMembers);
	var cMembers =$scope.building.committeeMembers;
	var modCMembers =[];
	var tempCMember=null;
	
	for(var i=0; i<cMembers.length;i++){
		tempCMember={};
		//tempCMember.name={};
		
		tempCMember.designation = cMembers[i].designation;
		if(angular.isDefined(cMembers[i].userDetails)){ //this member was modified
			//console.log("defined");
			//tempCMember.name.first= cMembers[i].name.fullName.name.first;
			//tempCMember.name.last= cMembers[i].name.fullName.name.last;
			tempCMember.user_id= cMembers[i].userDetails._id;
		}

		else{
			//console.log("not defined");
			//tempCMember.name.first= cMembers[i].name.first;
			//tempCMember.name.last= cMembers[i].name.last;
			//tempCMember.user_id= cMembers[i].user_id;
		}

		modCMembers.push(tempCMember);
		tempCMember = new Object();
	}
$scope.building.committeeMembers = modCMembers;
//console.log($scope.building.committeeMembers);

};

$scope.getMembersOfBuilding = function(name){	
return $http.get('/aptmgmt/api/users/name/'+name).then(function(response){
	console.log(response.data);
	return response.data;
})

};



$scope.getUsersByBuildingId= function(){

	console.log('getUsersByBuildingId called');
		$http.get('/aptmgmt/api/masterdata/building/'+building._id+'users/').then(function(response){			
			console.log(response.data);
			$scope.users = response.data;
		});

}


$scope.editForm = function(){
	
	if($scope.formEditMode == false){
		//committee members may be edited - copy the original committee members to the selected value so that they can 
		//be displayed in the typeahead dropdown
		for (var i =0; i<$scope.building.committeeMembers.length; i++) {

			$scope.building.committeeMembers[i].userDetails={};
			
			$scope.building.committeeMembers[i].userDetails._id = $scope.building.committeeMembers[i].user_id;
			$scope.building.committeeMembers[i].userDetails.name =$scope.building.committeeMembers[i].name;

		}
		//console.log($scope.building.committeeMembers);

		//console.log("----");
		//console.log($scope.selectedCommitteeMembers);

		$scope.formEditButtonText = "Cancel Edit";
		$scope.formEditMode = true;
		return;
	}

	if($scope.formEditMode == true){

		for (var i =0; i<$scope.building.committeeMembers.length; i++) {

			
			
			delete $scope.building.committeeMembers[i].userDetails;

		}

		console.log($scope.building.committeeMembers);
		//console.log("nullify");
		//$scope.selectedCommitteeMembers =null;
		//console.log($scope.selectedCommitteeMembers);
		$scope.getBuildingById(); //refresh the $scope building data to ensure changes during edit are lost
		$scope.formEditButtonText = "Edit";
		$scope.formEditMode = false;
		return;
	}
};

$scope.getBuildings = function(){
		console.log('getBuildings called');
		$http.get('/aptmgmt/api/masterdata/buildings').then(function(response){			
			console.log(response.data);
			$scope.buildings = response.data;
		});
	};

$scope.getBuildingById = function(){
		var id = $routeParams.id;
		console.log('getBuildingById called for building id:'+id);
		$http.get('/aptmgmt/api/masterdata/building/'+id).then(function(response){			
			
			var building = response.data;
			console.log(building);
			
			for(var i=0; i<building.committeeMembers.length;i++){

				//building.committeeMembers[i].name.fullName=building.committeeMembers[i].name.last+","+building.committeeMembers[i].name.first;
			}
			$scope.building = building;
			//$scope.selectedCommitteeMembers = angular.copy($scope.building.committeeMembers);
			console.log($scope.building);
			//$rootScope.building=building;
		});
	};
$scope.updateBuilding = function(){
		
		$scope.buildingInfo.$setPristine();//the form is submitted, so reset to pristine
		console.log("controller updateBuilding started");
		
		//modify the extra data from building that is not expected by backend. 
		/*for(var i=0; i<$scope.building.committeeMembers.length; i++){			
			delete $scope.building.committeeMembers[i].name.fullName;
		}*/
		console.log($scope.building);
		this.reStructureCommitteeMembers();//it is done to send committeeMembers structures properly to backend
		console.log($scope.building);
		$http.put('/aptmgmt/api/masterdata/building/'+$scope.building._id, $scope.building).then(function(response){
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
			$scope.getBuildingById();
			$scope.formEditMode =false;
			$scope.formEditButtonText ="Edit";
			
		});


	};

$scope.addAnotherPhone= function(){
		console.log("add another phone called");
		console.log($scope.building.contact.phone);
		$scope.building.contact.phone.push("");
		/*$scope.building.contact.phone[0]="hello";*/
	};

$scope.deletePhone= function(){
		console.log("delete phone called");
		console.log($scope.building.contact.phone);

		$scope.building.contact.phone.splice(this.$index,1);
		/*$scope.building.contact.phone[0]="hello";*/
	};

$scope.addCommitteeMember= function(){
		console.log("add another member called");
		console.log($scope.building.committeeMembers);
		//console.log($scope.selectedCommitteeMembers);
		$scope.building.committeeMembers.push("");
	};

$scope.deleteCommitteeMember= function(){
		console.log("delete member called for index:"+this.$index);
		console.log($scope.building.committeeMembers);
		$scope.building.committeeMembers.splice(this.$index,1);
	};

/*$scope.goToRooms =function(){
		console.log("inside goToRooms");
		$location.

};*/

  
}]);