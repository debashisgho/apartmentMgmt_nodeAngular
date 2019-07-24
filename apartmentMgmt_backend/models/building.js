
/*sample JSON

{  
   "_id":ObjectId("5916de46c9476927a4c7629e"),
   "name":"Rittika Apartment",
   "create_date":   ISODate("2017-05-13T10:21:58.467   Z"),   
   "associatedEmails":[  
      "debashisgho@gmail.com, guha.swagata2@gmail.com"
   ],
   "address":{  
      "landmark":"near 217-B Bus Stand",
      "country":"India",
      "state":"West Bengal",
      "district":"South 24 pgs",
      "city_vill":"Kolkata",
      "postOffice":"R-Gopalpur",
      "pin":"700136",
      "address3":"Kalipark",
      "address2":"Bablatala",
      "address1":"Sourav Ganguly Avenue"
   },
   "details":{  
      "towers":[  
         {  
            "_id":ObjectId("5916de46c9476927a4c7629f"),
            "name":"tower-A",
            "floors":[  
               {  
                  "_id":ObjectId("5916de46c9476927a4c762a0"),
                  "num":"5",
                  "rooms":[  

                  ]
               }
            ]
         }
      ],
      "type":"Stand-Alone"
   },
   "contact":{  
      "phone":[  
         "91-9903887868",
         "91-8585085845",
         "91-8583070701"
      ],
      "email":"rittikaApt@gmail.com"
   }
}
*/



var mongoose = require('mongoose');

//user schema
var buildingSchema = mongoose.Schema({

	name:
        {type: String, required: true, trim: true},

  	contact:
  		{
  			email:{type:String, required:true, unique: true,trim:true},
  			phone:[{type:String, trim:true}]
  		},

	details:{
		type:{type:String, required:true, enum: ['House', 'Co-Operative','Complex','Stand-Alone'],trim:true},
		towers:[{
			name:{type:String, required:true},
			floors:[{
				num:{type:String,required:true},
				rooms:[{
					type : mongoose.Schema.Types.ObjectId, ref: 'Room'
				}]
			}]
		}]
	},	
		
	address:
		{
			address1:{type:String, required:true, trim:true},
			address2:{type:String, trim:true},
			address3:{type:String, trim:true},
			pin:{type:String, required:true, trim:true},
			postOffice:{type:String, trim:true},
			city_vill:{type:String, required:true, trim:true},
			district:{type:String, trim:true},
			state:{type:String, required:true, trim:true},
			country:{type:String, required:true,trim:true},
			landmark:{type:String, trim:true}
		},	

	associatedEmails:[
		{type:String,required:true,trim:true}
	],
	committeeMembers:[{
			_id:false,
			designation:{type:String, required:true,trim:true},
			user_id:{type : mongoose.Schema.Types.ObjectId, ref: 'User',required: true}
	}],


	create_date:{type:Date, default: Date.now}

},{collection: 'buildings'});

var Building = mongoose.model('Building',buildingSchema);

//Get All Buildings - should be restricted 
getBuildings = function(callback,limit){
	var searchOptions='';
	var selectionRange = {create_date:0,__v:0};
	Building.find(searchOptions,selectionRange,callback).limit(limit);
}


//Get User by Email


getBuildingById = function(_id,callback){
	console.log('/moddels/building.js - get building by id -:'+_id);
	var searchOptions = {"_id":_id};
	//var selectionRange = {hashed_pwd:0,hashed_pwd_time:0,temp_pwd:0,temp_pwd_time:0,create_date:0,__v:0};
	var selectionRange = {__v:0};
	//console.log(searchOptions);
	Building.find(searchOptions, selectionRange,callback);
}

//Add Building
addBuilding = function(building, callback){
	console.log(building);
	Building.create(building, callback);
}

//Update Building

updateBuilding = function(id, building,callback){
	var searchOptions = {"_id":id};
	console.log("/model/building.js- update called for id :"+id)
	Building.findOneAndUpdate(searchOptions, building, callback);
}



Building.getBuildings = getBuildings;
Building.getBuildingById = getBuildingById;
Building.addBuilding = addBuilding;
Building.updateBuilding = updateBuilding;
module.exports = Building ;