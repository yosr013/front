import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { ClientCommandeCountDTO } from '../models/client-commande-count-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = "http://localhost:8080/api/v1/clients"

  constructor(private http:HttpClient) { }

  getClientList(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.baseUrl}`);
  }

  createClient(client: Client): Observable<Client> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Client>(this.baseUrl, client, { headers });
  }
  

  getClientById(id:number):Observable<Client>{
    return this.http.get<Client>(`${this.baseUrl}/${id}`)
  }

  updateClient(id: number, client: Client): Observable<Client> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Client>(`${this.baseUrl}/${id}`, client, { headers });
  }

  deleteClient(id:number):Observable<Object>{
    return this.http.delete(`${this.baseUrl }/${id}`);
  }

  getClientCommandeCount(): Observable<ClientCommandeCountDTO[]> {
    const url ="http://localhost:8080/api/v1/clients/commandes/count"; // Remplacez par l'URL appropriée pour récupérer le nombre de commandes par client

    return this.http.get<ClientCommandeCountDTO[]>(url);
  }
}
