import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient,private router : Router) { }

  //get current user logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  //generate token
  public generateToken(logindata:any){
    return this.http.post(`${baseUrl}/generate-token`, logindata);
  }

  // login user : set token in local storage
  public loginUser(token : any){
    localStorage.setItem("token",token);
    //alert(localStorage.getItem("token"));
    this.loginStatusSubject.next(true);
    //alert();
    return true;
  }

  // isLoggedIn or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //logout logic
  public logout(){
    this.router.navigate(['login']);
   // localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  // get token
  public getToken(){
    console.log("getToken");
    console.log(localStorage.getItem("token"));
    return localStorage.getItem("token");
  } 

  //store & set user details
  public setUser(user : any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  //get user Details
  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr !=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

    // get user role & authority
    public getUserRole(){
      let user = this.getUser();
      return user.authorities[0].authority;
    }


  }
  