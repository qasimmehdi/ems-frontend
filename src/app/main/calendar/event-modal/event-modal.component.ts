import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import * as moment from 'moment';

@Component({
    selector: 'app-event-modal',
    templateUrl: './event-modal.component.html',
    styleUrls: ['./event-modal.component.scss'],
})
export class EventModal {

    date: string;
    time: string;
    clientName: string;
    clientId: string;
    status: string;
    statusClass: "status-btn-schedule" | "status-btn-inprogress" | "status-btn-completed";

    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EventModal>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
    ) {
        console.log(data);
        this.time = moment(data.startDate*1000).format('LT');
        this.date = moment(data.startDate*1000).format('DD/MM/YYYY');
        this.status = data.status;
        if(data.status === "SCHEDULED"){
            this.statusClass = "status-btn-schedule";
        }
        else if(data.status === "COMPLETED"){
            this.statusClass = "status-btn-completed";
        }
        else {
            this.statusClass = "status-btn-inprogress";
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onProfileView(){
        this.router.navigateByUrl('/trainers/'+this.clientId);
    }

}