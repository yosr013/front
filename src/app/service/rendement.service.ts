import { Injectable } from '@angular/core';
import { Rendement } from '../models/rendement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendementService {

  private baseUrl = "http://localhost:8080/api/v1/rendement"

  constructor(private http:HttpClient) { }

  addRendement( employeId:number , rendement: Rendement) {
    return this.http.post('http://localhost:8080/api/v1/rendement/'+employeId,rendement);
  }

  getRendementList(): Observable<Rendement[]>{
    return this.http.get<Rendement[]>(`${this.baseUrl}`);
  }
}
