import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SessionService } from '../session.service';
import { Building } from '../model/Building';


import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { CommonUtils } from '../utils/commonUtils';



@Component({
  selector: 'app-building-single',
  templateUrl: './building-single.component.html',
  styleUrls: ['./building-single.component.css']
})
export class BuildingSingleComponent implements OnInit {
  
  public building:Building = new Building();
  private tempUserDetailsArr= [];
  public response: {status:string, message:string} = {status:'', message:''};
  
  constructor(private _sessionService: SessionService, private _activatedRoute:ActivatedRoute, private _commonUtils: CommonUtils) { }

  public formEditButtonText: string = "Edit";
  public formEditMode = false; //initialize with false

  ngOnInit() { 
	  this._activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
		   
		  this.building._id= paramMap.get('id');		
		 
		  this.getBuildingById();

	  });
  }

  getBuildingById(){		
		console.log('getBuildingById called ');
		this._sessionService.getBuildingById(this.building._id).subscribe(

				data => 
				{
					this.building = data ;
					this.tempUserDetailsArr = this.building.committeeMembers;
					console.log(this.building);

				}			
			);
		  }
		  
 editForm(){
	
			if(this.formEditMode == false){
				this.formEditButtonText = "Cancel Edit";
				this.formEditMode = true;
				//committee members may be edited - copy the original committee members to the selected value so that they can 
				//be displayed in the typeahead dropdown
				
				
				this.tempUserDetailsArr = [];
				var tempUserDetail = {designation:'',userDetails:{_id:'',name:{first:'',last:''}}};
				for (var i =0; i<this.building.committeeMembers.length; i++) {
		
					tempUserDetail.designation = this.building.committeeMembers[i].designation;
					tempUserDetail.userDetails._id = this.building.committeeMembers[i].user_id;
					tempUserDetail.userDetails.name = this.building.committeeMembers[i].name;
					this.tempUserDetailsArr.push(tempUserDetail);

					console.log('pushed :'+i+tempUserDetail);
					tempUserDetail= {designation:'',userDetails:{_id:'',name:{first:'',last:''}}};
				
				}

			

			
				return;
			}
		
			if(this.formEditMode == true){
		
				for (var i =0; i<this.building.committeeMembers.length; i++) {
		
				
		
				}
				
		
				console.log(this.building.committeeMembers);
			;
				this.getBuildingById(); //refresh the this building data to ensure changes during edit are lost
				this.formEditButtonText = "Edit";
				this.formEditMode = false;
				return;
			}
		};
		
	deletePhone(index:number){
		console.log('delete phone called for '+index);	
		console.log(this.building.contact.phone)	;
		this.building.contact.phone.splice(index,1);
		console.log(this.building.contact.phone);
	};

	addAnotherPhone(){
		console.log('add anotherphone called');
		this.building.contact.phone.push("");
		console.log(this.building.contact.phone);
	};

	deleteCommitteeMember(index:number){
		//console.log("delete member called for index:"+index);
		console.log(this.tempUserDetailsArr.length);
		console.log(this.tempUserDetailsArr);
		//this.building.committeeMembers.splice(index,1);
		
		//console.log(this.tempUserDetailsArr.length);
		for(var i=0; i<this.tempUserDetailsArr.length; i++){
			console.log(this.tempUserDetailsArr[i]);
		}

		this.tempUserDetailsArr.splice(index,1);
		
	};

	addCommitteeMember(){
		console.log("add another member called");
		console.log(this.tempUserDetailsArr);
		//console.log($scope.selectedCommitteeMembers);
   this.tempUserDetailsArr.push({designation:'', userDetails:{_id:'',name:{first:'',last:''}}});
		//this.building.committeeMembers.push({user_id:'',designation:'',name:{first:'',last:''}});
	};

	trackByFn(index: any, item: any) {
		//console.log(index + item);
		return index;
	 }

	 



	reStructureCommitteeMembers(){


		//console.log($scope.building.committeeMembers);
		
		var modCMembers =[];
		var tempCMember=null;
		
		for(var i=0; i<this.tempUserDetailsArr.length;i++){
			tempCMember={};
			//tempCMember.name={};
			
			tempCMember.designation = this.tempUserDetailsArr[i].designation;
			tempCMember.user_id= this.tempUserDetailsArr[i].userDetails._id;			
			tempCMember.name = this.tempUserDetailsArr[i].userDetails.name;
			modCMembers.push(tempCMember);
			tempCMember = new Object();
		}
	//@ts-ignore	
	this.building.committeeMembers = modCMembers;
	//console.log($scope.building.committeeMembers);
	
	};
	
	


	updateBuilding(){
		
	
		console.log("controller updateBuilding started");
		
		this.reStructureCommitteeMembers();//it is done to send committeeMembers structures properly to backend
		console.log(this.building);
		
		this._sessionService.updateBuilding(this.building._id, this.building).subscribe(

			data => {
				console.log("finished http call");
				console.log(data);

				var statusCode = "F";
			
				
				if(data.status < 400)
					{
						statusCode= "S";
					}

					this.response = {
						"status":statusCode,
						"message":data.message
					};
				
			

			//call the getBuildingById method to refresh the building data from backend
			this.getBuildingById();
			this.formEditMode =false;
			this.formEditButtonText ="Edit";
				
			}
		)
		

			
			

			
		};


	};



