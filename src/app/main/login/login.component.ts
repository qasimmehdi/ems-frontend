import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as UserActions from '../../actions/user.actions';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLogginIn: boolean = false;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private store: Store<AppState>,
        private router: Router,
        private loginService: LoginService,
        private _snackBar: MatSnackBar,
        private authService: AuthService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit() {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required]]
        });
        if (this.authService.isUserLoggedIn()) {
            this.router.navigateByUrl('dashboard')
        }
    }

    login() {
        let profile = undefined;
        let gym = undefined;
        this.loginService.login(this.loginForm.value)
            .then(async (res: any) => {
                await localStorage.setItem('access_token', res.access_token)
                return this.loginService.whoAmI()
            })
            .then((myProfile: any) => {
                profile = myProfile;
                return this.loginService.getMyGym()
            })
            .then(async (myGym: any) => {
                gym = myGym;
                await localStorage.setItem("myProfile", JSON.stringify(Object.assign({}, profile)))
                await localStorage.setItem("myGym", JSON.stringify(Object.assign({}, gym)))

                this.router.navigateByUrl('dashboards')
            })
            .catch(err => {
                if (err.error && err.error.msg) {
                    this._snackBar.open("Username/Password incorrect", 'Ok', {
                        duration: 2000,
                    });
                } else {
                    console.log(err)
                }
            })
    }

}
