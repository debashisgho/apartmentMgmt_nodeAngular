var mongoose = require('mongoose');


/*sample tower json message
{
	"name":"tower1",
	"building":ObjectId("5be9b85e80107342532bb3c3")

}


*/

//tower schema
var towerSchema = mongoose.Schema({

	name:
        {type: String, required: true, trim: true},  	

	building:
		{ type : mongoose.Schema.Types.ObjectId, ref: 'Building', required:true},
		

	create_date:{
		type:Date, default: Date.now
	}

},{collection: 'towers'});

towerSchema.index({ name: 1, building: 1 }); // combination of tower name and building should be unique

var Tower = mongoose.model('Tower',towerSchema);



//Get Tower by ID


getTowerById = function(_id,callback){
	console.log('/moddels/tower.js - get tower by id -:'+_id);
	var searchOptions = {"_id":_id};
	//var selectionRange = {hashed_pwd:0,hashed_pwd_time:0,temp_pwd:0,temp_pwd_time:0,create_date:0,__v:0};
	var selectionRange = {__v:0};
	//console.log(searchOptions);
	Tower.find(searchOptions, selectionRange,callback);
}



//Get towers by Building ID

getTowersByBuildingId = function(_buildingId, callback){

	console.log('/moddels/tower.js - get tower by building ID -:'+_buildingId);
	var searchOptions = {"building":_buildingId};
	//var selectionRange = {hashed_pwd:0,hashed_pwd_time:0,temp_pwd:0,temp_pwd_time:0,create_date:0,__v:0};
	var selectionRange = {__v:0};
	//console.log(searchOptions);
	Tower.find(searchOptions, selectionRange,callback);
}


//Add Tower
addTower = function(tower, callback){
	console.log(tower);
	Tower.create(tower, callback);
}

//Update Tower

updateTower = function(_id, tower,callback){
	var searchOptions = {"_id":_id};
	console.log("/model/tower.js- update called for id :"+_id);
	Building.findOneAndUpdate(searchOptions, tower, callback);
}


Tower.getTowersByBuildingId = getTowersByBuildingId;
Tower.getTowerById = getTowerById;
Tower.addTower = addTower;
Tower.updateTower = updateTower;

module.exports = Tower ;