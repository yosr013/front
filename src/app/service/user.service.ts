import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="http://localhost:8080/api/v1/users"

  constructor(private http:HttpClient) { }


  getUserList(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.baseUrl}/${id}`, user, { headers });
  }

  getUserById(id:number):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

  deleteUser(id:number):Observable<User>{
    return this.http.delete<User>(`${this.baseUrl }/${id}`);
  }

 

  
  
  

  



  
}


