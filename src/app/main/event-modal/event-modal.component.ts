import { HttpClient } from "@angular/common/http";
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import * as moment from "moment";
import { BASE_URL, BASE_URL_DEBUG } from "../dashboard/dash/dash.component";
import { regexes } from "../shared/regexes";

@Component({
    selector: "app-event-modal",
    templateUrl: "./event-modal.component.html",
    styleUrls: ["./event-modal.component.scss"],
})
export class EventModal {
    employeeForm: FormGroup;
    isSaving: false;

    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EventModal>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private http: HttpClient,
        private snackbar: MatSnackBar
    ) {
        console.log(data);
        this.employeeForm = this._formBuilder.group({
            email: [
                "",
                [Validators.required, Validators.pattern(regexes.email)],
            ],
            password: ["", [Validators.required]],
            name: ["", [Validators.required]],
            fatherName: ["", [Validators.required]],
            cnic: ["", [Validators.required]],
            grade: ["", [Validators.required]],
            joinDate: ["", [Validators.required]],
            allowances: ["", [Validators.required]],
            allowedLeaves: [0, [Validators.required]],
            remainingLeaves: [0, [Validators.required]],
            role: ["employee", [Validators.required]],
        });
        if (data.user) {
            this.employeeForm.setValue(data.user);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveEmployee() {
        let updatedData = this.employeeForm.value;
        updatedData.joinDate = moment(updatedData.joinDate).unix();
        console.log(updatedData);
        this.http.patch(
            BASE_URL_DEBUG + "/admin/updateEmployee/" + this.data.id,
            updatedData
        ).subscribe(
            res => {
                console.log(res);
                this.snackbar.open("Employee updated succuessfully", "OK", {
                    verticalPosition: 'bottom',
                    duration: 3000
                });
                this.dialogRef.close();
            },
            err => {
                console.log(err);
                this.snackbar.open(err.message || "Failed to update employee", "OK", {
                    verticalPosition: 'bottom',
                    duration: 3000
                });
            }
        )
    }

    createEmployee() {
        let updatedData = this.employeeForm.value;
        updatedData.joinDate = moment(updatedData.joinDate).unix();
        console.log(updatedData);
        this.http.post(
            BASE_URL_DEBUG + "/admin/addEmployee",
            updatedData
        ).subscribe(
            res => {
                console.log(res);
                this.snackbar.open("Employee created succuessfully", "OK", {
                    verticalPosition: 'bottom',
                    duration: 3000
                });
                this.dialogRef.close();
            },
            err => {
                console.log(err);
                this.snackbar.open(err.message || "Failed to create employee", "OK", {
                    verticalPosition: 'bottom',
                    duration: 3000
                });
            }
        )
    }
}
