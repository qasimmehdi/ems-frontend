import { Component, Inject } from "@angular/core";
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { TrainerService } from "../../trainer.service";
import { VerificationDialog } from "../dialog/dialog.component";
import { trainerObjectModifier } from "../trainer.component";


@Component({
    selector: 'app-reject-confirm-dialog',
    templateUrl: './reject-confirm.component.html',
    styleUrls: ['./reject-confirm.component.scss'],
})
export class RejectConfirmDialog {

    disableButtons: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<RejectConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private trainerService: TrainerService,
        private _snackBar: MatSnackBar,
    ) { }

    onSubmit(): void {
        this.disableButtons = true;
        console.log('comment', this.data.comment);
        this.trainerService.putChangeStatus(trainerObjectModifier(this.data.user, "REJECTED", this.data.comment))
            .then((resp: any) => {
                this._snackBar.open("Status changed successfully", 'Ok', {
                    duration: 3000,
                });
                //resp.status = "REJECTED";
                this.data.user = resp;
            })
            .catch(err => {
                if (err.message) {
                    this._snackBar.open(err.message, 'Ok', {
                        duration: 3000,
                    });
                }
                else {
                    this._snackBar.open("Failed to change status", 'Ok', {
                        duration: 3000,
                    });
                }
            })
            .finally(() => {
                this.disableButtons = false;
                this.dialogRef.close(this.data);
            })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}