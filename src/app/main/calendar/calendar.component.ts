import { Component, ChangeDetectionStrategy, OnInit, ViewEncapsulation, Input } from '@angular/core';
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
    format,
    addHours,
} from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from './utils/colors';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventModal } from './event-modal/event-modal.component';
import { Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { CalendarService } from './calendar.service';

interface Film {
    id: number;
    title: string;
    release_date: string;
}

function getTimezoneOffsetString(date: Date): string {
    const timezoneOffset = date.getTimezoneOffset();
    const hoursOffset = String(
        Math.floor(Math.abs(timezoneOffset / 60))
    ).padStart(2, '0');
    const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    const direction = timezoneOffset > 0 ? '-' : '+';

    return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

@Component({
    selector: 'mwl-demo-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './calendar.component.html',
    styleUrls: [
        '../../../../node_modules/angular-calendar/css/angular-calendar.css',
        './calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DemoComponent implements OnInit {
    view: CalendarView = CalendarView.Month;

    viewDate: Date = new Date();

    events$: Observable<CalendarEvent<{ film: Film }>[]>;

    activeDayIsOpen: boolean = false;
    @Output() screenResizeEvent2 = new EventEmitter<boolean>();
    BASE_URL_APP = environment.apiUrl;
    @Input() trainerId: string;

    constructor(private http: HttpClient,
        public dialog: MatDialog,
        private calendarService: CalendarService
    ) { }

    ngOnInit(): void {
        this.fetchEvents(this.trainerId);
        this.calendarService.getTrainerSchedule('5a9d4da7-20e6-406a-af3a-833f2cc804a3',
        1604170800, 1606762799).then(res => console.log(res));
    }

    fetchEvents(trainerId: string): void {
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
        console.log(start, end);

        const params = new HttpParams()
            .set(
                'primary_release_date.gte',
                format(getStart(this.viewDate), 'YYYY-MM-DD')
            )
            .set(
                'primary_release_date.lte',
                format(getEnd(this.viewDate), 'YYYY-MM-DD')
            )
            .set('api_key', '0ec33936a68018857d727958dca1424f');
        console.log(format(getStart(this.viewDate), 'YYYY-MM-DD'));

        this.events$ = this.http
            .get('https://api.themoviedb.org/3/discover/movie', { params })
            .pipe(
                map(({ results }: { results: Film[] }) => {
                    return results.map((film: Film) => {
                        return {
                            title: film.title,
                            start: (
                                addHours(film.release_date + getTimezoneOffsetString(this.viewDate), 6)
                            ),
                            color: colors.yellow,
                            allDay: false,
                            meta: {
                                film,
                            },
                        };
                    });
                })
            );
    }

    dayClicked({ date, events, }: { date: Date; events: CalendarEvent<{ film: Film }>[]; }): void {
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

    eventClicked(event: CalendarEvent<{ film: Film }>): void {
        this.openEventModal();
    }

    openEventModal(): void {
        const dialogRef = this.dialog.open(EventModal, {
            width: '420px',
            autoFocus: false
            //data: { name: this.name, animal: this.animal }
        });
    }

    goBack(): void {
        this.view = CalendarView.Month;
    }

    onResizeClick2(event: boolean): void {
        this.screenResizeEvent2.emit(event);
    }

}
