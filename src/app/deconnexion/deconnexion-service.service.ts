import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeconnexionServiceService {

  data: any;
  private baseUrl:string = "https://lycsfid.onrender.com/api/v1/";
  constructor(private http: HttpClient) {}

  //LOGOUT
  logout(outObj:any) {
    return this.http.get<any>(this.baseUrl + 'logout/', outObj);
  }

}
