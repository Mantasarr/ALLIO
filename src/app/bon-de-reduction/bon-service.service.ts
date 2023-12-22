import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ibons } from '../bon-de-reduction/bon';
import { Observable, catchError, map, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BonServiceService {

  data: any;
  private baseUrl:string = "https://lycsfid.onrender.com/api/v1/";

  constructor(private http: HttpClient) {}

  //BON DE REDUCTION
  creerbondereduc(bonObj:any) {
    return this.http.post<any>(this.baseUrl + 'bon/', bonObj);
  }

  getbondereduc() {
    return this.http.get<Ibons>(this.baseUrl + 'bon/').pipe(
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

  suppbondereduc(bonId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}bon/${bonId}`).pipe(
      catchError((error: any) => {
        console.error('Error deleting bon', error);
        return throwError(error); // Rethrow the error
      })
    );
  }

  updateBon(bonId: number, updatedBon: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}bon/${bonId}`, updatedBon).pipe(
      catchError((error: any) => {
        console.error('Error deleting bon', error);
        return throwError(error); // Rethrow the error
      })
    );
  }

}
