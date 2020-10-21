import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
    comment: string;
}

@Component({
    selector: 'app-reject-confirm-dialog',
    templateUrl: './reject-confirm.component.html',
    styleUrls: ['./reject-confirm.component.scss'],
})
export class RejectConfirmDialog{

    constructor(
        public dialogRef: MatDialogRef<RejectConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onSubmit(): void {
        console.log("submit");
        this.dialogRef.close();
    }

}