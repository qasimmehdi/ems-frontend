import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { TrainerService } from "../../trainer.service";
import { RejectConfirmDialog } from "../reject-confirm/reject-confirm.component";
import { trainerObjectModifier } from "../trainer.component";


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class VerificationDialog {

    comment: string;
    disableButtons: boolean = false;
    disableVerifyBtn: boolean = false;
    disableRejectBtn: boolean = false;

    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<VerificationDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private trainerService: TrainerService,
        private _snackBar: MatSnackBar,
    ) {
        console.log(data);
        if(data.user.status === 'VERIFIED'){
            this.disableVerifyBtn = true;
        }
        else if(data.user.status === 'REJECTED'){
            this.disableRejectBtn = true;
        }
     }

    onReject(): void {
        this.openDialog();
    }

    onVerify(): void {
        this.disableButtons = true;
        console.log("application vrified");
        this.trainerService.putChangeStatus(trainerObjectModifier(this.data.user, "VERIFIED"))
            .then((resp: any) => {
                this._snackBar.open("Status changed successfully", 'Ok', {
                    duration: 3000,
                });
                //resp.status = "VERIFIED";
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

    openDialog(): void {
        const dialogRef = this.dialog.open(RejectConfirmDialog, {
            autoFocus: false,
            data: { user: this.data.user, comment: this.comment }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if(result && result.user){
                this.data.user = result.user;
                this.dialogRef.close(result);
            }
            else{
                this.dialogRef.close();
            }

        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}