import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseurl = "http://182.189.94.159:27019/api/Register"

  constructor(private http:HttpClient) { }

  Register(payload){
    return new Promise((resolve,reject) => {
      this.http.post(this.baseurl+"/add",payload).subscribe(x => {
        resolve(x);
      },error => {
        reject(error);
      })
    })
  }


}
