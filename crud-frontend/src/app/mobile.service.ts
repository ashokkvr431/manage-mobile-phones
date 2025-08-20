import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private http: HttpClient) { }

  mobileName: string = "";
  price: string = "";
  ram: string = "";
  storage: string = "";
  id: number = 0;


  url = "http://10.70.9.31:3000/api/mobiles"

  fetchMobiles(): Observable<any> { 
    return this.http.get(this.url);
  }

  postMobile(body: any): Observable<any> {
    return this.http.post(this.url,body);
  }

  deleteMobile(id: number): Observable<any> {
    return this.http.delete(this.url+"/"+id); 
  }

  
  putMobile(body: any,id:number): Observable<any> {
    return this.http.put(this.url+"/"+id,body);
  }

}
