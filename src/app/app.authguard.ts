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
    // let gym = JSON.parse(localStorage.getItem('myGym'));

    if (state.url === "/") {
      isAllowed = true;
      return isAllowed;
    }

    // IF PROFILE OBJECTS EXISTS
    if (profile) {

      // IF ROLE IS ADMIN
      if (profile.userRole.find(role => role.name == Role.GAADMIN)) {
        isAllowed = true;

        // IF PROFILE IS NOT COMPLETED YET 
        // if (gym.stepsCompleted.split(",").length < 5 && state.url.includes("gym-")) {
        //   return true
        // }
        if ((state.url !== "/" && state.url !== "/dashboards")) {
          this.accessNotAllowed();
          return false;
        }
      }

      // IF ROLE IS FINANCE 
      // else if (profile.userRole.find(role => role.name == Role.GAFINANCE) && (state.url === "/finances" || state.url.includes("reports") || state.url.includes("disbursement"))) {
      //   if (gym.isActive) {
      //     return true
      //   } else {
      //     this.accessNotAllowed();
      //     return false
      //   }
      // }

      // IF ROLE IS LOGS
      // else if (profile.userRole.find(role => role.name == Role.GALOGS) && (state.url === "/logs" || state.url.includes("reports"))) {
      //   if (gym.isActive) {
      //     return true
      //   } else {
      //     this.accessNotAllowed();
      //     return false
      //   }
      // }

      // IF ROLE IS CHECKIN
      // else if (profile.userRole.find(role => role.name == Role.GMMANUALCHECKIN) && (state.url === "/dashboards" || state.url.includes("reports"))) {
      //   if (gym.isActive) {
      //     isAllowed = true;
      //     return true
      //   } else {
      //     this.accessNotAllowed();
      //     return false
      //   }
      // }
      else {
        // IF URL IS DASHBOARDS AND DASHBOARDS NOT ALLOWED, REDIRECTING TO SUBSCRIPTIONS
        // if(profile.userRole && !profile.userRole.find(role => role.name == Role.GMMANUALCHECKIN) && state.url === "/dashboards") {
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
    this.matSnackBar.open("Please update gym profile", "Ok", {
      duration: 2000,
      verticalPosition: 'bottom'
    })
  }

}
