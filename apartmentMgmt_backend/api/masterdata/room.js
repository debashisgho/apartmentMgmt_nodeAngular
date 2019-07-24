var express = require('express');
var router = express.Router();

Room = require('../../models/room');

//add the routes

//insert room
router.post('/aptmgmt/api/masterdata/building/tower/room',function(request, response){
	console.log('insert room called');
	var room = request.body;	
	console.log("print room objects");
	
	console.log(room);
	Room.addRoom(room, function(err,room){

		
		if(err){			
			//throw err;
			console.log(err);
			if(err.code==11000){
				response.json({status:409,message:"room is already existing"});				
			}
			else{
				//response.json({status:500,message:"Internal Server Error"});
				response.json(err);
			}
			return;
		}
		response.json({status:201, message:"room successfully added"});
	});
});

//update room by id
router.put('/aptmgmt/api/masterdata/building/tower/room/:id',function(request, response){
	var room = request.body;

	console.log("/api/room.js - update room request for id:"+request.params.id);
	console.log(request.body.owner_details.current);
	Room.updateRoom(request.params.id, room, function(err){

		if(err){
			response.json(err);
			return;
		}
		

   		response.json({status:202, message:"Room successfully updated"});
	});
});

//get room by room id

router.get('/aptmgmt/api/masterdata/building/tower/room/:_roomId',function(request, response){

	console.log("/api/room.js -"+request.body);
	var _roomId = request.params._roomId;
	Room.getRoomById(_roomId,function(err,rooms){
		
		if(err){
			response.json(err);
			return;
		}

	//	response.json(rooms);

		var roomJSObj = rooms[0].toObject();
		//console.log(roomJSObj);
		if(roomJSObj.owner_details.current.length >0){
			console.log("exist--------------------------");
			for(var member of roomJSObj.owner_details.current){
			
			var index=0;

			if(member._id){

					User.getUserById(member._id,function(err,user){

					if(err){
						console.log("app.js -getUserByEmail encountered error");
						response.json(err);
						return;
					}			
					console.log(roomJSObj.owner_details.current);
					roomJSObj.owner_details.current[index].name=user[0].toObject().name;
					console.log("got name");
					index=index+1;
					

					if(roomJSObj.owner_details.current.length == index){
						console.log("going to send response");
						console.log(roomJSObj);
						
						response.json(roomJSObj);
					}
								
					 
			});

			}			
		};

		}
	});
});

//get rooms by tower id
router.get('/aptmgmt/api/masterdata/building/tower/:_towerId/rooms',function(request, response){

	console.log("/api/room.js -"+request.body);
	var _towerId = request.params._towerId;
	Room.getRoomsByTowerId(_towerId,function(err,rooms){
		
		if(err){
			response.json(err);
			return;
		}
		response.json(rooms);
	});
});


module.exports = router;

