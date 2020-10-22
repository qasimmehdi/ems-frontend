import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import * as moment from 'moment';

@Component({
    selector: 'app-gym',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: fuseAnimations
})

export class UserComponent implements OnInit, OnDestroy {

    moment = moment;
    gym: any;
    pageType: string;
    gymForm: FormGroup;
    stateInfo: any[] = [];
    cityInfo: any[] = [];
    gymUser: any;
    countrySelected: any;
    stateSelected: any;
    public reenableButton = new EventEmitter<boolean>(false);
    toppings = new FormControl();
    certifications = ["ACE", "ACE"];

    user: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    animal: string;
    name: string;

    constructor(
        private UserService: UserService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update product on changes
        this.UserService.onItemChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = this.UserService.pageItem;
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    showNotify(message): void {
        // Show the success message
        this._matSnackBar.open(message, 'OK', {
            verticalPosition: 'bottom',
            duration: 3000
        });
    }

}

export const nameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;
    }

    let name = control.parent.get('name').value;

    if (name.trim()) {
        return null;
    }

    return { 'blankName': true };
};