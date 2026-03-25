import { Injectable, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Api  {
  baseURL = "http://localhost:8000/sissoko-room/api"
  http = inject(HttpClient)
  getProduct(filterValues:any){
    return this.http.get(`${this.baseURL}/getproducts`, {
      params: filterValues
    });
  }
  getProductBySlug(slug:any ){
    return this.http.get(`${this.baseURL}/product/${slug}/`)
  }
  createUser(forms:any){
    return this.http.post(`${this.baseURL}/customer/signup`, forms)
  }
  logInUser(data:any){
    return this.http.post(`${this.baseURL}/customer/login`, data, {
      withCredentials:true
    })
  }
  logOut(): Observable<any>{
    return this.http.post(`${this.baseURL}/logout`, {}, {withCredentials:true})
  }
  getUser(){
    return this.http.get(`${this.baseURL}/me`, {withCredentials: true})
  }
  refreshToken(): Observable<any>{
    return this.http.post(`${this.baseURL}/refreshtk`, {}, {withCredentials: true})
  }
  checkOut(product:[]){
    return this.http.post(`${this.baseURL}/checkOut/`, product, {withCredentials:true})
  }
}
