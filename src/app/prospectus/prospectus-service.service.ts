import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Iarticle } from '../prospectus/prospectus';


@Injectable({
  providedIn: 'root'
})
export class ProspectusServiceService {
  data: any;
  private baseUrl:string = "https://lycsfid.onrender.com/api/v1/";
  constructor(private http: HttpClient) {}

//ARTICLE
  article(prospecObj:any) {
    return this.http.post<any>(this.baseUrl + 'articles/', prospecObj);
  }

  getArticle(){
    return this.http.get<Iarticle>(this.baseUrl + 'articles/').pipe(
      map(
        (response: any) => {
          console.log('Data received', response.data);
          this.data = response.data;
          return this.data;
        },
        catchError((error: any) => {
          console.error('Error fetching data', error);
          return throwError(error); // Rethrow the error
        })
      )
    );
  }

  /*getTwoLatestArticles() {
    return this.http.get<Iarticle[]>(this.baseUrl + 'articles/latest?limit=2');
  }*/

  suppArticles(articleId: number) {
    return this.http.delete<any>(`${this.baseUrl}articles/${articleId}`);
  }

  updateArticles(articleId: number, updatedArticle: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}articles/${articleId}`, updatedArticle);
  }

}
