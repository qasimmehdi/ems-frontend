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
import { RegisterService } from './register.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { regexes } from '../shared/regexes';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegisterComponent implements OnInit {
    loginForm: FormGroup;
    isLogginIn: boolean = false;
    user$: Observable<object>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private store: Store<AppState>,
        private router: Router,
        private registerService: RegisterService,
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
            Email: ['', [Validators.required, Validators.pattern(regexes.email)]],
            Password: ['', [Validators.required]],
            FullName: ['', [Validators.required]]
        });
    }

    register() {
        this.isLogginIn = true;
        this.authService.Register(this.loginForm.value).then(x => {
            console.log(x);
            this.router.navigateByUrl('/login');
        })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.isLogginIn = false;
            })

    }

}
