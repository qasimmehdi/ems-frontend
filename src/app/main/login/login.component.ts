import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

// ngrx
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LOG_OUT, LOG_IN } from '../../store/actions/user.actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { regexes } from '../shared/regexes';

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
    actionFromRoute$: Observable<Params>;
    action: string;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private _snackBar: MatSnackBar,
        private authService: AuthService
    ) {
        // Configure the layout
        this.actionFromRoute$ = this.route.params;
        this.actionFromRoute$.subscribe(res => {
            console.log(res.action);
            this.action = res.action;
        })
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
            email: ['', [Validators.required, Validators.pattern(regexes.email)]],
            password: ['', [Validators.required]]
        });
        if (this.authService.isUserLoggedIn()) {
            this.router.navigateByUrl('dashboard')
        }
        //just for test
        //localStorage.removeItem('access_token');
    }

    login() {
        this.loginService.Login(this.loginForm.value).then((x: any) => {
            localStorage.setItem('access_token', x.jwt);
            if(x.role === 'employee'){
                this.router.navigateByUrl('/attendance/' + x.employee._id.$oid);
            }
            else if(x.role === 'admin'){
                this.router.navigateByUrl('/dashboard');
            }
        }).catch(err => {
            console.log(err);
        })
    }

}
