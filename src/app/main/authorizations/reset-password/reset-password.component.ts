import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { MatSnackBar } from '@angular/material';
import { AuthorizationService } from '../authorization.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [
        AuthorizationService
    ]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    resetPasswordForm: FormGroup;
    routeParams: any;
    entityNode = 'resetPassword';
    authid: string;
    pageType: String;
    pageMessage: String;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthorizationService,
        private _matSnackBar: MatSnackBar,
        private _route: ActivatedRoute,
        private router: Router

    ) {
        this.authid = this._route.snapshot.paramMap.get('id');
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
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update product on changes
        this._authService.onItemChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(id => {
                if (id === 'bat_request') {
                    this.pageType = 'invalid';
                    this.pageMessage = 'Invalid Request !';

                } else if (id === 'invalid_id') {
                    this.pageType = 'invalid';
                    this.pageMessage = 'Invalid Id !';
                }
                else {
                    this.pageType = 'valid';
                    this.pageMessage = 'RESET YOUR PASSWORD';
                }
            });

        this.resetPasswordForm = this._formBuilder.group({
            authId: [''],
            password: ['', Validators.minLength(8)],
            confirmPassword: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    resetPassword(): void {
        const data = this.resetPasswordForm.getRawValue();
        data.authId = this.authid;
        this._authService.resetPassword(data)
            .then((res: any) => {
                // Show the success messages
                if (res.status) {
                    this._matSnackBar.open('Reset Password Successfully!', 'OK', {
                        duration: 3000
                    });
                    this.router.navigateByUrl('/login')
                } else {
                    this._matSnackBar.open(res.message, 'OK', {
                        duration: 3000
                    });
                }
            })
            .catch(err => {
                console.log(err)
                this._matSnackBar.open('Unable to reset password!', 'OK', {
                    duration: 3000
                });
            })
    }
}

// Confirm Password Validator
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('confirmPassword');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };
};
