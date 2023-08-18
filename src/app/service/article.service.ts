import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl="http://localhost:8080/api/v1/articles"
  constructor(private http:HttpClient) { }

  

  addArticle(modeleId: number, article: Article): Observable<Article> {
    const url = `${this.baseUrl}/${modeleId}`;
    return this.http.post<Article>(url, article);
  }

  updateArtilce(id: number, article: Article): Observable<Article> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Article>(`${this.baseUrl}/${id}`, article, { headers });
  }

  getArticleList(): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.baseUrl}`);
  }

  getArticleById(id:number):Observable<Article>{
    return this.http.get<Article>(`${this.baseUrl}/${id}`)
  }

  updateArticle(id: number, article: Article): Observable<Object>{
    return this.http.put(`${this.baseUrl }/${id}`, article);
  }

  deleteArticle(id:number):Observable<Object>{
    return this.http.delete(`${this.baseUrl }/${id}`);
  }

  
  getTopArticles(): Observable<string[]> {
    const url = `${this.baseUrl}/top5`;
    return this.http.get<string[]>(url);
  }

 
  
}

