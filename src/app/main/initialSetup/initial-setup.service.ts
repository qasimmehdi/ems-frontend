import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const BASE_URL = environment.baseUrl;
const mock = "https://f7b00f2f-f808-4813-ada2-7d4f9e4f8bac.mock.pstmn.io";

@Injectable({
  providedIn: 'root'
})

export class InitialSetupService {
  constructor(private http: HttpClient) { }

  getInitialSetup(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${BASE_URL}/api/appservice/v1/initialSetup/`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  postInitialSetup(data: {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${BASE_URL}/api/appservice/v1/initialSetup/`, data)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}