import { Injectable } from '@angular/core';
import { Modele } from '../models/modele';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  private baseUrl = "http://localhost:8080/api/v1/modeles"

  constructor(private http:HttpClient) { }

  getModeleList(): Observable<Modele[]>{
    return this.http.get<Modele[]>(`${this.baseUrl}`);
  }

  createModele(modele: Modele): Observable<Modele> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Modele>(this.baseUrl, modele, { headers });
  }

  getModeleById(id:number):Observable<Modele>{
    return this.http.get<Modele>(`${this.baseUrl}/${id}`)
  }

  updateModele(id: number, modele: Modele): Observable<Modele> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Modele>(`${this.baseUrl}/${id}`, modele, { headers });
  }

  deleteModele(id:number):Observable<Object>{
    return this.http.delete(`${this.baseUrl }/${id}`);
  }
}

