import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const BASE_URL_ACCOUNT = environment.apiaccountUrl;

@Injectable({
  providedIn: 'root'
})

export class TrainerCalendarService {

  constructor(private _httpClient: HttpClient) { }

  getTrainersByName(keyword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${BASE_URL_ACCOUNT}/trainers/get-by-status?keyword=${keyword}`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    })
  }
}