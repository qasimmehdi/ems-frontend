import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'app-comment-modal',
    template: `<div fxLayout="row" fxLayoutAlign="end start">
                    <button
                    mat-icon-button
                    class="close-btn"
                    [disableRipple]="true"
                    [autofocus]="false"
                    (click)="onNoClick()">
                        <mat-icon>cancel</mat-icon>
                    </button>
                </div>
                <div fxLayout="column" fxLayoutAlign="center none">
                    <h1 style="text-align: center;">Comment</h1>
                    <p style="font-size: 16px">{{data.comment}}</p>
                </div>`,

    styles: [
        `.close-btn{
            position: absolute;
            margin-right: -20px;
            margin-top: -20px;
            mat-icon{
                color: #969191;
            }
        }`
    ]
})

export class CommentModal {
    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<CommentModal>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}