import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { User } from '../model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _sessionService:SessionService) { }

  ngOnInit() {        
     this._sessionService.startInitialSetUp(true);
  }

}
