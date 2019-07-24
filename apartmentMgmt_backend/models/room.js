var mongoose = require('mongoose');

//user schema
var roomSchema = mongoose.Schema({

	roomNo:
        {type: String, required: true, trim: true},

  	tower:
		{ type : mongoose.Schema.Types.ObjectId, ref: 'Tower'},
	
	floorNo:
		{type: String, trim: true},

	building:
		{ type : mongoose.Schema.Types.ObjectId, ref: 'Building'},
	
	area_details:{
		area:{type: Number, required:true, trim:true},
		measurementUnit:{type: String}
	},	

	owner_details:{ 

			current:[{				
				  	  _id:{type : mongoose.Schema.Types.ObjectId, ref: 'User',requred: true}
			}],		

			previous:[{
				_id:{type : mongoose.Schema.Types.ObjectId, ref: 'User',requred: true},
				fromDate:{type:Date,required:true},
				toDate:{type:Date,required:true}
			}]			
			
		},	

	others:{

			othersLiving:[{
				_id:{type : mongoose.Schema.Types.ObjectId, ref: 'User',requred: true}
			}]

		},

	rent_details:{ 

			current:[{				
				  	  _id:{type : mongoose.Schema.Types.ObjectId, ref: 'user',requred: true},
				  	  fromDate:{type:Date,required:true}
			}],		

			previous:[{
					  _id:{type : mongoose.Schema.Types.ObjectId, ref: 'user',requred: true},
					  fromDate:{type:Date,required:true},
				      toDate:{type:Date,required:true}
			}]
			
		},				

	
	create_date:{
		type:Date, default: Date.now
	}

},
{collection: 'rooms'});

//create a unique index based on buildingId, tower and floor No and building
roomSchema.index({building:1, tower:1,roomNo:1},{unique: true});

/*roomSchema.pre('validate', function (next) {
  console.log('pre validate method of room----');
  console.log(this);
  if(this.roomNo == null){
  	// next(new Error('hashed_pwd should not be empty'));
  	console.log('Room data is not okay');  	
    return;
  }
  next();
});*/

var Room = mongoose.model('Room',roomSchema);


//Add Room
addRoom = function(room, callback){
	console.log(room);
	Room.create(room, callback);
};

updateRoom = function(id, room,callback){
	var searchOptions = {"_id":id};
	console.log("/model/room.js- update called for id :"+id)
	Room.findOneAndUpdate(searchOptions, room, callback);
}
getRoomsByTowerId= function(towerId,callback){
	console.log("getRoomsByTowewrId called for towerid ="+towerId);
	var searchOptions = {"tower":towerId};
	//var selectionRange = {hashed_pwd:0,hashed_pwd_time:0,temp_pwd:0,temp_pwd_time:0,create_date:0,__v:0};
	var selectionRange = {__v:0};
	//console.log(searchOptions);
	Room.find(searchOptions, selectionRange,callback);
};

getRoomById = function(roomId,callback){
	console.log("getRoomById called for roomId :"+roomId);
	var searchOptions = {"_id":roomId};
	var selectionRange = {__v:0};
	Room.find(searchOptions, selectionRange,callback);
}

Room.addRoom =addRoom;
Room.getRoomsByTowerId =getRoomsByTowerId;
Room.getRoomById = getRoomById;
Room.updateRoom = updateRoom;
module.exports = Room ;