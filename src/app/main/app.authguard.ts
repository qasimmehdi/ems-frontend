import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Role } from 'app/main/teams/role.enum';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AppAuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {
  }

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
    let gym = JSON.parse(localStorage.getItem('myGym'));

    if (state.url === "/") {
      isAllowed = true;
      return isAllowed;
    }

    // IF GYM AND PROFILE OBJECTS EXISTS
    if (profile && gym) {

      // IF ROLE IS ADMIN
      if (profile.userRole.find(role => role.name == Role.GAADMIN)) {
        isAllowed = true;
      }

      // IF ROLE IS FINANCE 
      else if (profile.userRole.find(role => role.name == Role.GAFINANCE) && (state.url === "/finances" || state.url.includes("reports") || state.url.includes("disbursement"))) {
        if (gym.isActive) {
          return true
        } else {
          this.accessNotAllowed();
          return false
        }
      }

      // IF ROLE IS CUSTOMER CARE 
      else if (profile.userRole.find(role => role.name == Role.GACUSTOMERCARE) && (state.url === "/faqs" || state.url === "/supports" || state.url === "/nfc-requests" || state.url === "/filter-requests" || state.url === "/finance-supports" || state.url === "/user-reports")) {
        if (gym.isActive) {
          return true
        } else {
          this.accessNotAllowed();
          return false
        }
      }

      // IF ROLE IS ON-BOARDING 
      else if (profile.userRole.find(role => role.name == Role.GAONBOARDING) && (state.url === "/teams" || state.url === "/teams/new")) {
        if (gym.isActive) {
          return true
        } else {
          this.accessNotAllowed();
          return false
        }
      }

      // IF ROLE IS SALES 
      else if (profile.userRole.find(role => role.name == Role.GASALES) && (state.url === "/aminities")) {
        if (gym.isActive) {
          return true
        } else {
          this.accessNotAllowed();
          return false
        }
      }

      else {
        // IF URL IS DASHBOARDS AND DASHBOARDS NOT ALLOWED, REDIRECTING TO SUBSCRIPTIONS
        // if(profile.userRole && !profile.userRole.find(role => role.name == Role.GMMANUALCHECKIN) ) {
        //   this._router.navigateByUrl("/subscriptions")
        // }

        // return new Observable<boolean>((observer) => {
        //   setTimeout(() => {
        //     console.log('done!');
        //     observer.next(true);
        //     observer.complete();
        //   }, 3000);
        // });
        this.accessNotAllowed();
        return false
      }
    }
    return isAllowed;
    // return true
  }

  accessNotAllowed() {
    this.matSnackBar.open("Access not allowed", "Ok", {
      duration: 2000,
      verticalPosition: 'bottom'
    })
  }

}
