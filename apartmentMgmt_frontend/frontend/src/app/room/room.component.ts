import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SessionService } from '../session.service';
import { Building } from '../model/Building';
import { Tower } from '../model/Tower';
import { Room } from '../model/Room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  //get the building id from the url
  public building:Building = new Building();
  public towers:Tower[];
  public selectedTowerId:string ='';
  public selectedTowerName: string='';
  public rooms:Room[] ;

  constructor(private _sessionService: SessionService, private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {

    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
		   
      this.building._id= paramMap.get('id');		
      console.log('building id is '+this.building._id);
		 
      this.getBuildingById();
      this.getTowersByBuildingId();

	  });
  }

  //get details of the building
  getBuildingById(){		
		console.log('getBuildingById called ');
		this._sessionService.getBuildingById(this.building._id).subscribe(

				data => 
				{
					this.building = data ;
					
					console.log(this.building);

				}			
			);
		  }


//get list of towers -/aptmgmt/api/masterdata/building/:buildingId/towers

getTowersByBuildingId= function(){

	console.log('getTowersByBuildingId called for building Id :'+this.building._id);
			
      this._sessionService.getTowersByBuildingId(this.building._id).subscribe(
      
        data=>{
          console.log(data);
          this.towers = data;          
          if(this.building._id){
            this.selectedTowerId = this.towers[0]._id;
            this.selectedTowerName= this.towers[0].name;
            this.getRoomsByTower();
          }
        }
			
      )};


getRoomsByTower=function(){
        console.log('getRoomsByTower called for '+this.selectedTowerId);
        this._sessionService.getRoomsByTower(this.selectedTowerId).subscribe(

            data=>{
              console.log(data);
              this.rooms = data;
              
            }
        )};

selectedTowerIdChangeHandler($event){
  console.log($event);
}



}
