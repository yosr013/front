import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taille } from '../models/taille';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TailleService {
  private apiUrl='http://localhost:8080/api/v1'

  constructor(private http:HttpClient) { }

  addTaille(articleId: number, taille: Taille): Observable<Taille> {
    const url = `${this.apiUrl}/taille/${articleId}`;
    return this.http.post<Taille>(url, taille);
  }
}
