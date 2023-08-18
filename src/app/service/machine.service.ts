import { Injectable } from '@angular/core';
import { Machine } from '../models/machine';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  baseUrl="http://localhost:8080/api/v1/machines"

  constructor(private http:HttpClient) { }

  addMachine(chaineId: number, article: Machine): Observable<Machine> {
    const url = `${this.baseUrl}/${chaineId}`;
    return this.http.post<Machine>(url, article);
  }

  getMachineList(): Observable<Machine[]>{
    return this.http.get<Machine[]>(`${this.baseUrl}`);
  }

  getAllMachinesByChaineId( chaineId:number ,) {
    return this.http.get('http://localhost:8080/api/v1/listemachines/'+chaineId);
  }

  getMachineById(id:number):Observable<Machine>{
    return this.http.get<Machine>(`${this.baseUrl}/${id}`)
  }

}
