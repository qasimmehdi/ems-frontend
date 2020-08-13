import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${BASE_URL}/api/accountservice/v1/GAUser/token`, user)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  whoAmI(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${BASE_URL}/api/accountservice/v1/auth/whoami`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  getMyGym(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${BASE_URL}/api/appservice/v1/gym/getMyGym`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
