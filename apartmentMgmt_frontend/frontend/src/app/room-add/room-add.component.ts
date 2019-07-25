import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SessionService } from '../session.service';
import { Tower } from '../model/Tower';
import { Room } from '../model/Room';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { CommonUtils } from '../utils/commonUtils';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css']
})


export class RoomAddComponent implements OnInit {
  public buildingId : string='';
  public towers:Tower[] = [];
  public room:Room = new Room();
  public selectedTowerId:string ='';
  public measurementAreaUnit:string = "Sq.ft.";
  public response: {status:string, message:string} = {status:'', message:''};
  

  popUpPrevOwnerFromDate =[];
  popUpPrevOwnerToDate =[];
  popUpCurrRentFromDate=[];
  popUpPrevRentFromDate=[];
  popUpPrevRentToDate=[];

  
  constructor(private _sessionService: SessionService, private _activatedRoute:ActivatedRoute,
              private _commonUtils:CommonUtils) { 

  }

  ngOnInit() {

    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
		   
      this.buildingId= paramMap.get('id');		
      console.log('building id is '+this.buildingId);
      
      this.getTowersByBuildingId();

	  });
  }
  
//trackByFn
  trackByFn(index: any, item: any) {
		//console.log(index + item);
		return index;
	 }

//get list of towers -/aptmgmt/api/masterdata/building/:buildingId/towers

getTowersByBuildingId= function(){

	console.log('getTowersByBuildingId called for building Id :'+this.buildingId);
			
      this._sessionService.getTowersByBuildingId(this.buildingId).subscribe(
      
        data=>{
          console.log(data);
          this.towers = data; 
        }
			
      )};



addCurrentOwner=function(){
        console.log("add currentOwner called");        
        this.room.owner_details.current.push({name:{last:'',first:'', fullName:''}});
        console.log(this.room);
      };
    
deleteCurrentOwner= function($index:number){
        console.log("delete current Owner called for index :"+$index);        
        this.room.owner_details.current.splice($index,1);
        console.log(this.room);
      };

addPreviousOwner= function(){
        console.log("add PreviousOwner called");      
        this.room.owner_details.previous.push({name:{last:'',first:'', fullName:''}});
        //console.log($scope.room);
      };

    
deletePreviousOwner= function($index:number){
        console.log("delete Previous Owner called");
        this.room.owner_details.previous.splice($index,1);
      };

addCurrentRent= function(){
        console.log("add currentRent called");
        this.room.rent_details.current.push({name:{last:'',first:'', fullName:''}});
      };

deleteCurrentRent= function($index:number){
        console.log("delete current rent called for index :"+$index);        
        this.room.rent_details.current.splice($index,1);
        console.log(this.room);
      };

addPreviousRent= function(){
        console.log("add previous rent called");      
        this.room.rent_details.previous.push({name:{last:'',first:'', fullName:''}});
        //console.log($scope.room);
      };

    
deletePreviousRent= function($index:number){
        console.log("delete Previous rent called");
        this.room.rent_details.previous.splice($index,1);
      };
addOthersLiving = function(){
  console.log("add others living called");
  this.room.others.othersLiving.push({name:{last:'',first:'',fullName:''}});
}

deleteOthersLiving = function($index:number){
  this.room.others.othersLiving.splice($index,1);
}

addRoom= function(){
	console.log("add room function called");
//	$scope.roomAdd.$setPristine();//the form is submitted, so reset to pristine

	this.room.building = this.buildingId;
	this.room.tower = this.selectedTowerId;
	this.room.area_details.measurementUnit = this.measurementAreaUnit;
  console.log(this.room);
  /*
  this._sessionService.addRoom(this.room).subscribe(
    response =>{
      console.log(response);
    }
  ) */
}


  /*
	$http.post('/aptmgmt/api/masterdata/building/tower/room', this.room).then(function(response){
			console.log(response);
			console.log('-------'+response.data.status+" : "+response.data.message);
			var statusCode = "F";
			
			if(response.data.status < 400)
			{
				statusCode= "S";
			}

			this.response = {
				"status":statusCode,
				"message":response.data.message
			};
			
		});
};

*/
    

   

}