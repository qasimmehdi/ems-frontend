import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class LeagueService {
    baseurl = "https://localhost:44305/api/Leagues/";
    constructor(private http: HttpClient) {}

    addLeague(payload) {
        return new Promise((resolve, reject) => {
            this.http.post(this.baseurl + "add", payload).subscribe(
                (x) => resolve(x),
                (err) => reject(err)
            );
        });
    }

    getLeague() {
      return new Promise((resolve, reject) => {
        this.http.get(this.baseurl + "getAll").subscribe(
            (x) => resolve(x),
            (err) => reject(err)
        );
    });
    }
}
