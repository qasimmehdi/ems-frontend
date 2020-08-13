import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthorizationService } from '../authorization.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgetPasswordComponent implements OnInit {
    promoCodeForm: FormGroup;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthorizationService,
        private snackBar: MatSnackBar,
        private router: Router
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

    ngOnInit(): void {
        this.promoCodeForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    copyInputMessage = (inputElement): void => {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
    }

    submit() {
        let email = this.promoCodeForm.get('email').value;
        this.authService.forgetPassword(email)
            .then((res: any) => {
                if (res.status) {
                    this.snackBar.open(res.message, "Ok", {
                        duration: 3000
                    })
                    this.router.navigateByUrl('/login');
                } else {
                    this.snackBar.open(res.message, "Ok", {
                        duration: 3000
                    })
                }
            })
            .catch(err => {
                console.log(err)
                this.snackBar.open("Unable to submit", "Ok", {
                    duration: 3000
                })
            })
    }
}
