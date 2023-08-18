import { Injectable } from '@angular/core';
import { SuiviProd } from '../models/suivi-prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuiviProdService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/v1/suivi/pourcentage-pieces-defaillantes';
  private apiUrl1='http://localhost:8080/api/v1'

  addSuivi( ordreId:number , suivi: SuiviProd) {
    return this.http.post('http://localhost:8080/api/v1/suivi/'+ordreId,suivi);
  }

  getPourcentageById(ordreId: number): Observable<any> {
    const url = `${this.apiUrl}/${ordreId}`; 
    return this.http.get<any>(url);
  }

  getPeriodesFab(ordreFabId: number) {
    const url = `http://localhost:8080/api/v1/suivieProd/${ordreFabId}/periodesFab`;
    return this.http.get<Map<string, number>>(url);
  }
  
}
