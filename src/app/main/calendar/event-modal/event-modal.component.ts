import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


@Component({
    selector: 'app-event-modal',
    templateUrl: './event-modal.component.html',
    styleUrls: ['./event-modal.component.scss'],
})
export class EventModal {

    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EventModal>,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}