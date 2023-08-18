import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../models/commande';
import { Observable } from 'rxjs';
import { CommandeDTO } from '../models/commande-dto';
import { ClientCommandeCountDTO } from '../models/client-commande-count-dto';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  baseUrl="http://localhost:8080/api/v1/commandes"
  private apiUrl = 'http://localhost:8080/api/v1/commandes/nombre'

  private apiUrl1 = 'http://localhost:8080/api/v1/commandes/etat'

  private apiUrl2 = 'http://localhost:8080/api/v1';

  private apiUrl3 = 'http://localhost:8080/api/v1/commandes/tri-par-date-livraison';
  constructor(private http:HttpClient) { }

  createCommande(articleId: number, clientId: number, commande: Commande): Observable<Commande> {
    const url = `http://localhost:8080/api/v1/commandes/${articleId}/${clientId}`;
    return this.http.post<Commande>(url, commande);
  }

  deleteCommande(id:number):Observable<Commande>{
    return this.http.delete<Commande>(`${this.baseUrl }/${id}`);
  }

  getCommandesList(): Observable<Commande[]>{
    return this.http.get<Commande[]>(`${this.baseUrl}`);
  }

  getCommandeById(id:number):Observable<Commande>{
    return this.http.get<Commande>(`${this.baseUrl}/${id}`)
  }
  
  updateCommande(id: number, commande: any): Observable<Commande> {
    return this.http.put<Commande>(`${this.baseUrl}/${id}`, commande);
  }
  
  getNombreCommandesEtatZero(): Observable<number> {
    return this.http.get<number>(this.apiUrl);
  }

  getNombreCommandesEtatUn(): Observable<number> {
    return this.http.get<number>(this.apiUrl1);
  }

  getPourcentageCommandesEtatUn(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/v1/commandes/etat-un/percentage');
  }

  getPourcentageCommandesEtatZero(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/v1/commandes/etat-zero/percentage');
  }

  getMostOrderedArticleLabel() {
    return this.http.get('http://localhost:8080/api/v1/articles/plus-commande',{ responseType: 'text' });
  }

  getMostOrderedArticleCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl2}/articles/plus-commande/count`);
  }

  getCommandesDTO(): Observable<CommandeDTO[]> {
    return this.http.get<CommandeDTO[]>(this.apiUrl3);
  }

  generatePDF(commandeId: number): Observable<HttpResponse<Blob>> {
    
    return this.http.get('http://localhost:8080/api/v1/commandes/pdf/'+commandeId, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
