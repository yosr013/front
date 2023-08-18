import { Injectable } from '@angular/core';
import { Gamme } from '../models/gamme';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GammeService {

  private baseUrl = "http://localhost:8080/api/v1/gammes";

  constructor(private httpClient: HttpClient) { }

  createGamme(gamme: Gamme): Observable<Gamme> {
    return this.httpClient.post<Gamme>(this.baseUrl, gamme);
  }

  getGammesList(): Observable<Gamme[]>{
    return this.httpClient.get<Gamme[]>(`${this.baseUrl}`);
  }
}
