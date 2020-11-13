import { HttpClient } from "@angular/common/http";
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
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
        private http: HttpClient
    ) {
        console.log(data);
        this.getAppointmentDetails(data.id)
            .then((res: any) => {
                this.time = moment(res.appointmentStartDate * 1000).format('LT');
                this.date = moment(res.appointmentStartDate * 1000).format('DD/MM/YYYY');
                this.status = res.appointmentStatus;
                this.clientName = res.appUser.name;
                this.clientId = res.appUser.id;
                if (res.appointmentStatus === "SCHEDULED") {
                    this.statusClass = "status-btn-schedule";
                }
                else if (res.appointmentStatus === "COMPLETED") {
                    this.statusClass = "status-btn-completed";
                }
                else {
                    this.statusClass = "status-btn-inprogress";
                }
            })
            .catch(e => console.log(e))

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onProfileView() {
        this.router.navigateByUrl('/trainers/' + this.clientId);
    }

    getAppointmentDetails(id: string) {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/admin/trainers/appointmentDetail/${id}`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }

}