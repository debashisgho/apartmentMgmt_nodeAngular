import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../session.service';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user:User;
  constructor(private _sessionService:SessionService, private router:Router) {
    
   }

  ngOnInit() {
    this._sessionService.isLoggedIn().subscribe(
      data => this.setupNavbar(data))
     
  }

  logout(){
    console.log("log out called");
    this.user=null;
    this._sessionService.logout().subscribe(data => console.log(data));
  }

  setupNavbar(data:any){
    this.user = data.user;     
    console.log(this.user) ;
    //this._sessionService.startInitialSetUp(true);
  }

}
