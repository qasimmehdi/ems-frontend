import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { TrainerService } from '../trainer.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import * as moment from 'moment';

@Component({
    selector: 'app-gym',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.scss'],
    animations: fuseAnimations
})

export class TrainerComponent implements OnInit, OnDestroy {

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

    trainer: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private trainerService: TrainerService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private route: ActivatedRoute
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update product on changes
        this.trainerService.onItemChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(trainer => {
                this.trainer = this.trainerService.pageItem;
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