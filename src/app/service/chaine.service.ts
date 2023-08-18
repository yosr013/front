import { Injectable } from '@angular/core';
import { Chaine } from '../models/chaine';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChaineService {

  private baseUrl = "http://localhost:8080/api/v1/chaines"

  constructor(private http:HttpClient) { }

  createChaine(chaine: Chaine): Observable<Chaine> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Chaine>(this.baseUrl, chaine, { headers });
  }

  getChaineList(): Observable<Chaine[]>{
    return this.http.get<Chaine[]>(`${this.baseUrl}`);
  }

  getAllMachinesByChaineId( chaineId:number ) {
    return this.http.get('http://localhost:8080/api/v1/chaines/'+chaineId+'/machines');
  }

  getChaineById(id:number):Observable<Chaine>{
    return this.http.get<Chaine>(`${this.baseUrl}/${id}`)
  }

}
