import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BASE_URL_DEBUG } from '../dashboard/dash/dash.component';

const BASE_URL = environment.baseUrl;
const BASE_URL_APP = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  Login(payload) {
    return new Promise((resolve, reject) => {
      this.http.post(BASE_URL_DEBUG + '/login', payload).subscribe(x => {
        resolve(x);
      }, error => {
        reject(error);
      })
    })
  }

}
