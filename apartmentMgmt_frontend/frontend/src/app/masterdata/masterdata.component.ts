import { Component, OnInit, NgZone } from '@angular/core';
import { SessionService } from '../session.service';
import { MasterDataCategory } from '../model/masterdataCategory';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-masterdata',
  templateUrl: './masterdata.component.html',
  styleUrls: ['./masterdata.component.css']
})
export class MasterdataComponent implements OnInit {

  public masterDataL: MasterDataCategory[] = [];
    

  constructor(private _sessionService:SessionService) { 
    this.getMasterDataCategories();
  }

  ngOnInit() {
  //  this.masterDataL.push({_id: "5be9b1a7669624b528a862a8", type: "building", description: "Maintain Building Detail", img_url: "../images/building.png"});
  
  }

  getMasterDataCategories(){
    this._sessionService.getMasterDataCategories().subscribe(
      data => this.masterDataL = data)
      }    
  }

 