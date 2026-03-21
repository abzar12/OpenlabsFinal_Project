import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Api {
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
  logInUser(forms:any){
    return this.http.post(`${this.baseURL}/customer/login`, forms)
  }
}
