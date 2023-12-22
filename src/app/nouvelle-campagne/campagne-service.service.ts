import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Icampagne } from './campagne';


@Injectable({
  providedIn: 'root'
})
export class CampagneServiceService {
  data: any;
  private baseUrl:string = "https://lycsfid.onrender.com/api/v1/";
  constructor(private http: HttpClient) {}

//CAMPAGNE DE PROMOTION
creerPromotion(promoObj:any) {
  return this.http.post<any>(this.baseUrl + 'campagnes/', promoObj);
}

voirpromotion() {
  return this.http.get<Icampagne>(this.baseUrl + 'campagnes/').pipe(
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

suppPromotion(promoId: number) {
  return this.http.delete<any>(`${this.baseUrl}campagnes/${promoId}`);
}

}
