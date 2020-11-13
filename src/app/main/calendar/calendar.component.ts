import { Component, ChangeDetectionStrategy, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
    isSameMonth,
    isSameDay,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    startOfDay,
    endOfDay,
    addMinutes
} from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from './utils/colors';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventModal } from './event-modal/event-modal.component';
import { Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { CalendarService } from './calendar.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
    selector: 'mwl-demo-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './calendar.component.html',
    styleUrls: [
        '../../../../node_modules/angular-calendar/css/angular-calendar.css',
        './calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DemoComponent implements OnChanges {
    view: CalendarView = CalendarView.Month;

    viewDate: Date = new Date();

    events$: Observable<CalendarEvent<any>[]>;

    activeDayIsOpen: boolean = false;
    isLoading: boolean = false;
    @Output() screenResizeEvent2 = new EventEmitter<boolean>();
    @Input() trainerId: string;

    constructor(public dialog: MatDialog,
        private calendarService: CalendarService,
        private _snackBar: MatSnackBar,
    ) { }

    ngOnChanges() {
        if (this.trainerId) {
            this.fetchEvents();
            console.log('trainer changed', this.trainerId);
        }
    }

    fetchEvents(): void {
        this.isLoading = true;
        const getStart: any = {
            month: startOfMonth,
            week: startOfWeek,
            day: startOfDay,
        }[this.view];

        const getEnd: any = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay,
        }[this.view];

        const start = moment(getStart(this.viewDate)).unix();
        const end = moment(getEnd(this.viewDate)).unix();

        this.events$ = this.calendarService.getTrainerSchedule(this.trainerId,
            start, end)
            .pipe(
                map((results) => {
                    if (results.length === 0) {
                        this._snackBar.open('No events in the selected period', 'Ok', {
                            duration: 3000,
                        });
                    }
                    return results.map((appointment) => {
                        const tempStartDate = new Date(appointment.startDate * 1000);
                        const data = {
                            title: moment(tempStartDate).format('LT')+ ' | ' + appointment.status,
                            start: tempStartDate,
                            end: addMinutes(tempStartDate, 30),
                            color: this.calculateColor(appointment.status),
                            allDay: false,
                            meta: {
                                appointment,
                            },
                        };
                        return data;
                    });
                })
            );
            this.isLoading = false;
    }

    dayClicked({ date, events, }: { date: Date; events: CalendarEvent<any>[]; }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                //this.activeDayIsOpen = false;
            } else {
                //this.activeDayIsOpen = true;
                this.viewDate = date;
                this.view = CalendarView.Day;
            }
        }
    }

    eventClicked(event: CalendarEvent<any>): void {
        this.openEventModal(event);
    }

    openEventModal(event: CalendarEvent<any>): void {
        this.dialog.open(EventModal, {
            width: '420px',
            autoFocus: false,
            data: { id: event.meta.appointment.id }
        });
    }

    goBack(): void {
        this.view = CalendarView.Month;
    }

    onResizeClick2(event: boolean): void {
        this.screenResizeEvent2.emit(event);
    }

    calculateColor(status: string): string{
        if (status === "SCHEDULED") {
            return colors.gray;
        }
        else if (status === "COMPLETED") {
            return colors.green;
        }
        else {
            return colors.yellow;
        }
    }

}
