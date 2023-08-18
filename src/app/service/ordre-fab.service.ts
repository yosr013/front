import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdreFab } from '../models/ordre-fab';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdreFabService {

  private baseUrl = "http://localhost:8080/api/v1/ordres";
 

  constructor(private http: HttpClient) { }

  createOrdreFabrication(commandeId: number, gammeId: number, ordre: OrdreFab): Observable<OrdreFab> {
    const url = `${this.baseUrl}/${commandeId}/${gammeId}`;
    return this.http.post<OrdreFab>(url, ordre);
  }
  getOrdreFabList(): Observable<OrdreFab[]>{
    return this.http.get<OrdreFab[]>(`${this.baseUrl}`);
  }

  getOrdreFabById(id:number):Observable<OrdreFab>{
    return this.http.get<OrdreFab>(`${this.baseUrl}/${id}`)
  }

  generatePDF(ordreId: number): Observable<HttpResponse<Blob>> {
    
    return this.http.get('http://localhost:8080/api/v1/ordres/pdf/'+ordreId, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
