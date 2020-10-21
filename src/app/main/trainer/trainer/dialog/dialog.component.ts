import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RejectConfirmDialog } from "../reject-confirm/reject-confirm.component";


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class VerificationDialog {

    comment: string;

    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<VerificationDialog>,
    ) { }

    onReject(): void {
        console.log("application rejected");
        this.dialogRef.close();
        this.openDialog();
    }

    onVerify(): void {
        console.log("application vrified");
        this.dialogRef.close();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(RejectConfirmDialog, {
            data: { comment: this.comment }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
        });
    }

}