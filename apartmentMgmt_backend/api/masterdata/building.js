var express = require('express');
var router = express.Router();

Building = require('../../models/building');
User = require('../../models/user');



//insert building
router.post('/aptmgmt/api/masterdata/building',function(request, response){
	console.log('insert building called');
	var building = request.body;	
	console.log("print building objects");
	
	console.log(building);
	Building.addBuilding(building, function(err,building){
		
		if(err){			
			//throw err;
			if(err.code==11000){
				response.json({status:409,message:"building is already existing"});				
			}
			else{
				//response.json({status:500,message:"Internal Server Error"});
				response.json(err);
			}
			return;
		}
		response.json({status:201, message:"building successfully added"});
	});
});

//get list of buildings
router.get('/aptmgmt/api/masterdata/buildings',function(request, response){
	Building.getBuildings(function(err,buildings){
		if(err){
			response.json(err);
			return;
		}
		response.json(buildings);
	});
});


//get building by building id
/*router.get('/aptmgmt/api/building/:_id',function(request, response){
	console.log('get building  by id called for id:'+request.params._id);
	
	Building.getBuildingById(request.params._id,function(err,building){

		if(err){
			console.log("building.js -getBuildingById encountered error");
			response.json(err);
			return;
		}
		console.log("/api/building.js -getBuildingById db call success");
		
		response.json(building);
	});
	
});*/

router.get('/aptmgmt/api/masterdata/building/:_id',function(request, response){
	console.log('get building  by id called for id:'+request.params._id);
	
	Building.getBuildingById(request.params._id,function(err,building){

		if(err){
			console.log("building.js -getBuildingById encountered error");
			response.json(err);
			return;
		}
		console.log("/api/building.js -getBuildingById db call success");
		console.log(building[0]);
		var buildingJSObj = building[0].toObject();
		


		console.log(buildingJSObj.committeeMembers);
		

		if(buildingJSObj.committeeMembers.length >0){
			console.log("exist");
			for(var member of buildingJSObj.committeeMembers){
			
			var index=0;

			if(member.user_id){

					User.getUserById(member.user_id,function(err,user){

					if(err){
						console.log("app.js -getUserByEmail encountered error");
						response.json(err);
						return;
					}			
					
					buildingJSObj.committeeMembers[index].name=user[0].toObject().name;
					console.log("got name");
					index=index+1;
					

					if(buildingJSObj.committeeMembers.length == index){
						console.log("going to send response");
						
						response.json(buildingJSObj);
					}
								
					 
			});

			}			
		};

		}

		else{
			console.log("going to send response");
			response.json(buildingJSObj);
		}
		
		
		
				
		
	});
	
});


//update building by id
router.put('/aptmgmt/api/masterdata/building/:id',function(request, response){
	var building = request.body;

	console.log("/api/building.js - update building request for id:"+request.params.id);
	
	Building.updateBuilding(request.params.id, building, function(err){

		if(err){
			response.json(err);
			return;
		}
		

   		response.json({status:202, message:"Building successfully updated"});
	});
});
module.exports = router;