//import {Injectable} from "@angular/core";
import { SessionService } from '../session.service';
//import { Building } from '../model/Building';


import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
  })
  
export class CommonUtils{

	constructor(private _sessionService:SessionService){

	}

	searchUserDetailsByNameUI = (text$: Observable<string>) =>
	 	
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
			//	: this.tempUserDetailsArr.filter(v => v.name.first.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
				: this.searchUserDetailsByNameSync(term).filter(v => (v.name.first+" "+v.name.last).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
	)

	formatUserSearchDropdown = (x: {_id:string, name: {first:string, last:string}}) => x.name.first+' '+x.name.last;

	searchUserDetailsByNameSync(name: string):{_id:string,name:{first:string,last:string}}[]{
		console.log('search called for '+name);
		//console.log(this.tempUserDetailsArr);
		return this._sessionService.searchUserDetailsByName(name);
		
    }


}




/*

  export function searchUserDetailsByNameUI(text$: Observable<string>) {
	 	
  text$.pipe(
	debounceTime(200),
	distinctUntilChanged(),
	map(term => term.length < 2 ? []
		  	  : this.searchUserDetailsByNameSync(term).filter(v => (v.name.first+" "+v.name.last).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )
	}

  export function  formatUserSearchDropdown(x: {_id:string, name: {first:string, last:string}}):string {
	return x.name.first+' '+x.name.last;
  } 

  export function searchUserDetailsByNameSync(name: string):{_id:string,name:{first:string,last:string}}[]{
	  console.log('search called for '+name);
	  //console.log(this.tempUserDetailsArr);
	  return this._sessionService.searchUserDetailsByName(name);
	  
  }
*/


    

