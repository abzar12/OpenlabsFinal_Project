import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Api {
  baseURL = "http://localhost:8000/sissoko-room/api"
  http = inject(HttpClient)

  getProduct(){
    return this.http.get(`${this.baseURL}/getproducts`);
  }
  getProductBySlug(slug:any){
    return this.http.get(`${this.baseURL}/product/${slug}`)
  }
}
