import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Item } from '../interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceClient {

  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) { }

  getUser(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + `/paged?page=${page}&size=${size}`);
  
  }
  
  createUser(body:Item){
    return this.http.post<any>(this.apiUrl, body)
  }

  updateUser(body:Item, id:number){
    return this.http.put<any>(this.apiUrl + `/${id}`, body)
  }
  deleteUser(id:number){
    return this.http.delete<any>(this.apiUrl + `/${id}`)
  }

}
