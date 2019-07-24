import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import {SessionService } from './session.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule }   from '@angular/forms';
import { MasterdataComponent } from './masterdata/masterdata.component';
import { BuildingComponent } from './building/building.component';
import { AddBuildingComponent } from './add-building/add-building.component';
import { BuildingSingleComponent } from './building-single/building-single.component';
import { RoomComponent } from './room/room.component';
import { RoomSingleComponent } from './room-single/room-single.component';
import { RoomAddComponent } from './room-add/room-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    MasterdataComponent,
    BuildingComponent,
    AddBuildingComponent,
    BuildingSingleComponent,
    RoomComponent,
    RoomSingleComponent,
    RoomAddComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
