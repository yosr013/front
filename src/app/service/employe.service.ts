import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../models/employe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {



  private baseUrl = "http://localhost:8080/api/v1/employees";

  constructor(private httpClient: HttpClient) { }
  
  getEmployeesList(): Observable<Employe[]>{
    return this.httpClient.get<Employe[]>(`${this.baseUrl}`);
  }

  createEmployee(employe: Employe): Observable<Employe> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Employe>(`${this.baseUrl}`, employe, { headers });
  }

  getEmployeById(id:number):Observable<Employe>{
    return this.httpClient.get<Employe>(`${this.baseUrl}/${id}`)
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put(url, employee);
  }

  deleteEmploye(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl }/${id}`);
  }
}
