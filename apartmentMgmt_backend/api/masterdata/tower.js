var express = require('express');
var router = express.Router();

Tower = require('../../models/tower');


//insert tower
router.post('/aptmgmt/api/masterdata/building/tower',function(request, response){
	console.log('insert tower called');
	var tower = request.body;	
	console.log("print tower objects");
	
	console.log(tower);
	Tower.addTower(tower, function(err,tower){
		
		if(err){			
			//throw err;
			if(err.code==11000){
				response.json({status:409,message:"tower is already existing"});				
			}
			else{
				//response.json({status:500,message:"Internal Server Error"});
				response.json(err);
			}
			return;
		}
		response.json({status:201, message:"tower successfully added"});
	});
});


//get towers by building id
router.get('/aptmgmt/api/masterdata/building/:_buildingId/towers',function(request, response){

	console.log("/api/tower.js -"+request.body);
	var _buildingId = request.params._buildingId;
	Tower.getTowersByBuildingId(_buildingId,function(err,towers){
		if(err){
			response.json(err);
			return;
		}
		response.json(towers);
	});
});


module.exports = router;