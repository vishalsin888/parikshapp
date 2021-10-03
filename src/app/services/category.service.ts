import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  //load all categories
  public categories(){
    return this.http.get(`${baseUrl}/category/`);
  }

  //add new category
  
  public addcategory(category:any){
    console.log("add categories");
    
    console.log(category);
    return this.http.post(`${baseUrl}/category/`,category);
  }
}
