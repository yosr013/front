import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operation } from '../models/operation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private baseUrl = "http://localhost:8080/api/v1/operations"
  private baseUrl1 = "http://localhost:8080/api/v1/operation"

  constructor(private http: HttpClient) { }

  
  createOperation(phaseId: number, machineId: number, operation: Operation): Observable<HttpResponse<string>> {
    const url = `http://localhost:8080/api/v1/operation/${phaseId}/${machineId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<string>(url, operation, { headers, observe: 'response' });
  }
  


  updateOperation(operationId: number, operation: Operation): Observable<string> {
    const url = `${this.baseUrl1}/${operationId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<string>(url, operation, { headers });
  }
  
  

  getOperationList(): Observable<Operation[]>{
    return this.http.get<Operation[]>(`${this.baseUrl}`);
  }

  deleteOperation(id:number):Observable<Operation>{
    return this.http.delete<Operation>(`${this.baseUrl }/${id}`);
  }

  getOperationById(id:number):Observable<Operation>{
    return this.http.get<Operation>(`${this.baseUrl}/${id}`)
  }

  
}
