import { Injectable } from '@angular/core';
// import { AppState } from 'app/app.state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { LOG_OUT } from './store/actions/user.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        // private store: Store<AppState>,
        private router: Router,
        private store: Store<AppState>,
    ) { }

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
