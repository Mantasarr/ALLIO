import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InscriptionServiceService {

  data: any;
  private baseUrl:string = "https://lycsfid.onrender.com/api/v1/";
  constructor(private http: HttpClient) {}

  //PARTENAIRE
  partenaire(partObj:any) {
    return this.http.post<any>(this.baseUrl + 'partenaires', partObj);
  }

}
