import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

const BASE_URL = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAccountAdded: boolean = true;

    constructor(
        private router: Router
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
        this.router.navigateByUrl('login');
    }


}
