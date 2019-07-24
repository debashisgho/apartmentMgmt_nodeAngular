import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component' ;
import { HomeComponent } from './home/home.component' ;
import { RegisterComponent } from './register/register.component';
import { MasterdataComponent } from './masterdata/masterdata.component';
import { BuildingComponent } from './building/building.component';
import { AddBuildingComponent } from './add-building/add-building.component';
import { BuildingSingleComponent } from './building-single/building-single.component';
import { RoomComponent } from './room/room.component';
import { RoomSingleComponent } from './room-single/room-single.component';
import { RoomAddComponent } from './room-add/room-add.component';

const routes: Routes = [  
  {path: 'aptmgmt/login', component:LoginComponent},
  {path: 'aptmgmt/home', component:HomeComponent},
  {path: 'aptmgmt/register', component:RegisterComponent},
  {path: 'aptmgmt/masterdata', component:MasterdataComponent},
  {path: 'aptmgmt/masterdata/building', component:BuildingComponent},
  {path: 'aptmgmt/masterdata/building/add', component:AddBuildingComponent},
  {path: 'aptmgmt/masterdata/building/:id', component:BuildingSingleComponent,pathMatch:'full'},
  {path: 'aptmgmt/masterdata/building/:id/tower/rooms', component:RoomComponent,pathMatch:'full'},
  {path: 'aptmgmt/masterdata/building/tower/room/:id', component:RoomSingleComponent,pathMatch:'full'},
  {path: 'aptmgmt/masterdata/building/:id/tower/rooms/add', component:RoomAddComponent,pathMatch:'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
