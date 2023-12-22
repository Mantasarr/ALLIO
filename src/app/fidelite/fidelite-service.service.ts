import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

interface Ipaliers {
  montant:number;
  equiPoints:number;
}

@Injectable({
  providedIn: 'root',
})

export class FideliteServiceService {

  data: any;
  private baseUrl:string = "https://lycsfid.onrender.com/api/v1/";

  constructor(private http: HttpClient) {}

  creerPalier(palierObj:any) {
    return this.http.post<any>(this.baseUrl + 'program-fidelite/create/', palierObj);
  }

  getPaliers() {
    return this.http.get<Ipaliers>(this.baseUrl + 'program-fidelite/create/').pipe(
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

  supPaliers(palierId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}program-fidelite/create/${palierId}`).pipe(
      catchError((error: any) => {
        console.error('Error deleting palier', error);
        return throwError(error); // Rethrow the error
      })
    );
  }


}
