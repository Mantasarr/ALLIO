import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConnexionServiceService {

  data: any;
  private baseUrl:string = "https://lycsfid.onrender.com/api/v1/";
  constructor(private http: HttpClient) {}

  //LOGIN
  login(userObj:any) {
    return this.http.post<any>(this.baseUrl + 'login/', userObj);
  }
}
