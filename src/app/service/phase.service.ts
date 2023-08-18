import { Injectable } from '@angular/core';
import { Phase } from '../models/phase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  private baseUrl = "http://localhost:8080/api/v1/phases"

  constructor(private http:HttpClient) { }

  addPhase(gammeId: number, phase: Phase): Observable<Phase> {
    const url = `${this.baseUrl}/${gammeId}`;
    return this.http.post<Phase>(url, phase);
  }

  getPhasesList(): Observable<Phase[]>{
    return this.http.get<Phase[]>(`${this.baseUrl}`);
  }
}
