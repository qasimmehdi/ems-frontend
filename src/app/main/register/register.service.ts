import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const BASE_URL = environment.baseUrl;
const BASE_URL_APP = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  login(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${BASE_URL}/api/accountservice/v1/admins/login`, user)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
