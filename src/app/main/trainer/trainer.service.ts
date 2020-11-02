import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

const BASE_URL = environment.baseUrl;
const BASE_URL_ACCOUNT = environment.apiaccountUrl;

@Injectable({
  providedIn: 'root'
})

export class TrainerService {

  entityNode = 'GMUser';
  routeParams: any;
  item: any;
  pageItem: any;
  items: any[];
  onItemChanged: BehaviorSubject<any>;
  onPageItemChanged: BehaviorSubject<any>;
  onItemsChanged: BehaviorSubject<any>;

  constructor(
    private _httpClient: HttpClient

  ) {
    // Set the defaults
    this.onItemChanged = new BehaviorSubject({});
    this.onPageItemChanged = new BehaviorSubject({});
    this.onItemsChanged = new BehaviorSubject({});

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {

      Promise.all([
        this.getInit()
      ])
        .then(() => {
          resolve();
        },
          reject
        );
    });
  }

  getInit() {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === undefined) {
        this._httpClient.get(`${BASE_URL_ACCOUNT}/trainers`)
          .subscribe((response: any) => {
            this.pageItem = response;
            this.onPageItemChanged.next(this.pageItem);
            resolve(response);
          }, reject => {
            resolve(reject)
          });
      } else {
        this._httpClient.get(`${BASE_URL_ACCOUNT}/trainers/${this.routeParams.id}`)
          .subscribe((response: any) => {
            this.pageItem = response;
            this.onPageItemChanged.next(this.pageItem);
            resolve(response);
          }, reject => {
            resolve(reject)
          });
      }
    });
  }


  getPageItem(page: Number, size: Number, status: "verified" | "unverified" | "rejected" | "", keyword?: string) {
    return new Promise((resolve, reject) => {
      if (keyword) {
        this._httpClient.get(`${BASE_URL_ACCOUNT}/trainers/get-by-status?status=${status}&keyword=${keyword}&page=${page}&size=${size}`)
          .subscribe((response: any) => {
            this.pageItem = response;
            this.onPageItemChanged.next(this.pageItem);
            resolve(response);
          }, reject);
      }
      else {
        if (status != "") {
          console.log(keyword);
          this._httpClient.get(`${BASE_URL_ACCOUNT}/trainers/get-by-status?status=${status}&page=${page}&size=${size}`)
            .subscribe((response: any) => {
              this.pageItem = response;
              this.onPageItemChanged.next(this.pageItem);
              resolve(response);
            }, reject);
        }

        else {
          this._httpClient.get(`${BASE_URL_ACCOUNT}/trainers?page=${page}&size=${size}`)
            .subscribe((response: any) => {
              this.pageItem = response;
              this.onPageItemChanged.next(this.pageItem);
              resolve(response);
            }, reject);
        }
      }
    });

  }
}
