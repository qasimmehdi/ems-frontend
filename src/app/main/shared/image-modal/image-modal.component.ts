import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface ImageModalData {
    src: string;
}

@Component({
    selector: 'app-image-modal',
    templateUrl: './image-modal.component.html',
    styleUrls: ['./image-modal.component.scss'],
})


export class ImageModal {

    constructor(
        public dialogRef: MatDialogRef<ImageModal>,
        @Inject(MAT_DIALOG_DATA) public data: ImageModalData
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}