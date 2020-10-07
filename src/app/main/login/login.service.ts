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
      this.http.post(`${BASE_URL}/api/thauthservice/v1/admins/login`, user)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${BASE_URL}/api/thauthservice/v1/admins/profile`)
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
