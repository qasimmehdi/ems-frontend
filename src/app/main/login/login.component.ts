import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

// ngrx
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LOG_OUT, LOG_IN } from '../../store/actions/user.actions';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

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
    user$: Observable<object>;

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
        //just for test
        //localStorage.removeItem('access_token');
    }

    login() {
        this.isLogginIn = true;
        let profile = undefined;
        let gym = undefined;
        this.loginService.login(this.loginForm.value)
            .then(async (res: any) => {
                await localStorage.setItem('access_token', res.access_token);
                return this.loginService.getProfile();
            })
            .then(async (myProfile: any) => {
                profile = myProfile;

                this.store.dispatch({
                    type: LOG_IN,
                    payload: {
                        myProfile: profile
                    }
                });
                this.user$ = this.store.pipe(select('user'));
                this.user$.subscribe(resp => console.log(resp));

                this.router.navigateByUrl('dashboards');
                //return this.loginService.getMyGym()
            })
            /* .then(async (myGym: any) => {
                gym = myGym;
                await localStorage.setItem("myProfile", JSON.stringify(Object.assign({}, profile)))
                await localStorage.setItem("myGym", JSON.stringify(Object.assign({}, gym)))

                this.router.navigateByUrl('dashboards')
            }) */
            .catch(err => {
                if (err.error.status == "404" || err.error && err.error.msg) {
                    this._snackBar.open("Username or Password incorrect", 'Ok', {
                        duration: 2000,
                    });
                } else {
                    console.log(err);
                }
            })
            .finally(() => {
                this.isLogginIn = false;
            })
    }

}
