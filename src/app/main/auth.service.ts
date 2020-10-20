import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { LOG_OUT } from 'app/store/actions/user.actions';

const BASE_URL = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAccountAdded: boolean = true;

    constructor(
        private http: HttpClient,
        private store: Store<AppState>,
        private router: Router
    ) { }

    isAccountUpdated() {
        this.http.get(`${BASE_URL}/api/accountservice/v1/auth/whoami`)
            .subscribe((me: any) => {
                this.http.get(`${BASE_URL}/api/financeservice/v1/bank/verify/${me.authId}`)
                    .subscribe((res: any) => {
                        this.isAccountAdded = true;
                    }, err => {
                        if (err.error && err.error.errors && err.error.errors.account) {
                            this.isAccountAdded = false;
                        } else {
                            this.isAccountAdded = true;
                        }
                    })
            })
    }

    isUserLoggedIn(): boolean {
        let token = localStorage.getItem('access_token');
        if (token) {
            return true
        } else {
            return false
        }
    }

    logout() {
        localStorage.removeItem('access_token');
        this.store.dispatch({
            type: LOG_OUT,
            payload: {}
        });
        this.router.navigateByUrl('login');
    }


}
