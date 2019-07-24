import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Building } from '../model/Building';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  public buildings: Building[] =[];
  constructor(private _sessionService:SessionService, private _router:Router) { }

  ngOnInit() {
    this.getBuildings();
  }


  getBuildings(){
    console.log('getBuildings called');
    this._sessionService.getBuildings().subscribe(
      data => this.buildings = data)
    		
  };
  
  
}
