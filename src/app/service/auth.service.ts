import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';


const AUTH_API = 'http://localhost:8080/api/auth/';

//le type de contenu du corps de la requête. Dans ce cas, 'application/json'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private storageService: StorageService,private router: Router) { }

  //La méthode post retourne un objet Observable qui permet de gérer la réponse asynchrone du serveur
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string,confirmation:string,name:string,numTel:string,adresse:string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        confirmation,
        name,
        numTel,
        adresse
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  resetPassword(email: string, newPassword: string, newConfirmation: string): Observable<any> {
    const resetPasswordRequest = {
      email: email,
      newPassword: newPassword,
      newConfirmation: newConfirmation
    };
  
    return this.http.post('http://localhost:8080/api/auth/reset-password', resetPasswordRequest, httpOptions);
  }
  
}
