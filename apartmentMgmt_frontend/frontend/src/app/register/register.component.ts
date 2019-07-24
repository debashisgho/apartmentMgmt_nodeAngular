import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { SessionService } from '../session.service';
import { ApiResponse } from '../model/ApiResponse';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = new User();
  registerUserResponse: ApiResponse = new ApiResponse();


  constructor(private _sessionService:SessionService) { }

  ngOnInit() {
  }

  registerUser(){
    console.log("register user called");
    console.log(this.user);
    this._sessionService.registerUser(this.user).subscribe(data => this.registerUserResponse = data);
  }


  

}
