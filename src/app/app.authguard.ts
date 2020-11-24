import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs';

@Injectable()
export class AppAuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private store: Store<AppState>,
  ) {
  }

  user$: Observable<object>;

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    // UNPROTECTED ROUTES
    // LOGIN, FORGET-PASS, PROMO-CODE

    // LOGGED IN: FALSE
    // ACCESSING UNPROTECTED ROUTES: FALSE
    if (
      (
        state.url !== "/login" &&
        state.url !== "/forget-password" &&
        state.url !== "/promo-code"
      ) &&
      !this.authService.isUserLoggedIn()
    ) {
      this._router.navigate(['/login'])
      return true
    }

    // LOGGED IN: FALSE
    // ACCESSING UNPROTECTED ROUTES: TRUE
    if ((
      state.url === "/login" ||
      state.url === "/forget-password" ||
      state.url === "/promo-code"
    ) && !this.authService.isUserLoggedIn()) {
      return true
    }

    // LOGGED IN: TRUE
    // ACCESSING UNPROTECTED ROUTES: TRUE
    if (
      (
        state.url === "/login" ||
        state.url === "/forget-password" ||
        state.url === "/promo-code"
      ) &&
      this.authService.isUserLoggedIn()
    ) {
      this._router.navigate(['/dashboards']);
      return false;
    }

    // PROTECTING ROUTES BASED ON THEIR ROLES
    let isAllowed = false;
    let profile = JSON.parse(localStorage.getItem('myProfile'));
    this.user$ = this.store.pipe(select('user'));
    let u = await this.user$.toPromise();
    console.log(u);
    // let gym = JSON.parse(localStorage.getItem('myGym'));

    if (state.url === "/") {
      isAllowed = true;
      return isAllowed;
    }
    return isAllowed;
    // return true
  }

  accessNotAllowed() {
    this.matSnackBar.open("Please update gym profile", "Ok", {
      duration: 2000,
      verticalPosition: 'bottom'
    })
  }

}
