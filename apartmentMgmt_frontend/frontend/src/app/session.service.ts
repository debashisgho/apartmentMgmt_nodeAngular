import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './model/User';
import { Router } from '@angular/router';
import { ApiResponse } from './model/ApiResponse';
import { MasterDataCategory } from './model/masterdataCategory';
import { Building } from './model/Building';
import { Tower } from './model/Tower';
import { Room } from './model/Room';
import { strictEqual } from 'assert';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private isLoggedinUrl ='/aptmgmt/api/user/session/isLoggedIn';
  private logoutUrl = '/aptmgmt/api/user/session/logout';
  private registerUserUrl='/aptmgmt/api/user/';
  private getMasterDataCategoriesUrl="/aptmgmt/api/masterdata/categories";
  private getBuildingUrl="/aptmgmt/api/masterdata/buildings";
  private getBuildingSingleUrl="/aptmgmt/api/masterdata/building/";
  private getTowersByBuildingIdUrl=""
  public user:User ;
  constructor(private _http:HttpClient, private router:Router) { }

  isLoggedIn(): Observable<any>{  
  return this._http.get<any>(this.isLoggedinUrl).pipe(
      catchError(this.errorHandler));      
  }

  logout():Observable<any>{
    console.log('session service logout called');
    this.user =null;
    return this._http.get<any>(this.logoutUrl).pipe(
      catchError(this.errorHandler));
    
  }
  registerUser(user:User):Observable<ApiResponse>{
    console.log('register user api service called');
    return this._http.post<ApiResponse>(this.registerUserUrl, user).pipe(
      catchError(this.errorHandler)) ;
  }

  getMasterDataCategories():Observable<MasterDataCategory[]>{
    console.log('get masterdata categories ervice called');
    return this._http.get<MasterDataCategory[]>(this.getMasterDataCategoriesUrl).pipe(
      catchError(this.errorHandler)) ;
  }

  getBuildings(): Observable<Building[]>{
    console.log('getBuilding called');
    return this._http.get<Building[]>(this.getBuildingUrl).pipe(
      catchError(this.errorHandler));
        
  }

  getBuildingById(buildingId: string):Observable<Building>{
    console.log('getBuildingById() called');
    return this._http.get<Building>(this.getBuildingSingleUrl+buildingId).pipe(
      catchError(this.errorHandler));
  }

  updateBuilding(buildingId: string, building:Building): Observable<ApiResponse>{
    console.log('updateBuilding() called');
    return this._http.put<ApiResponse>('/aptmgmt/api/masterdata/building/'+buildingId, building).pipe(
      catchError(this.errorHandler));
  }

  getTowersByBuildingId(buildingId: string):Observable<Tower[]>{
    console.log('getTowersByBuildingId called');
    return this._http.get<Tower[]>(this.getBuildingSingleUrl+"/"+buildingId+"/towers").pipe(
      catchError(this.errorHandler));
    
  }
  
  getRoomsByTower(towerId: string):Observable<Room[]>{
    console.log('getRoomsByTower called');
    return this._http.get<Room[]>(this.getBuildingSingleUrl+"tower/"+towerId+"/rooms").pipe(
      catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Unknown Server Error")
  };

  
  startInitialSetUp(redirectIfNotLoggedInFlag:boolean):void{
    console.log('start initial session start up =====');
    this.isLoggedIn().subscribe(
      data => this.performInitialSetUp(data, redirectIfNotLoggedInFlag));
  }

  performInitialSetUp(data:any, redirectIfNotLoggedInFlag: boolean):void{
    console.log('perform initial session start up =====');
    
    //@ts-ignore
    if(data.user ==null){
      console.log('not logged in');
      this.router.navigate(['/aptmgmt/home']);
    }
    else{
      this.user = data.user;
      console.log(this.user);
      
    }
  }

  searchUserDetailsByName(name:string): {_id:string,name:{first:string,last:string}}[]{
        var userDetails: {_id:string,name:{first:string,last:string}}[]=[];
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          userDetails = JSON.parse(xhttp.responseText)
          console.log(userDetails);
        }
      };
      xhttp.open("GET", "/aptmgmt/api/users/name/"+name.trim(), false); //sync requests
      xhttp.send();
      console.log("going to return results for "+name);
      return userDetails;

  }


}

