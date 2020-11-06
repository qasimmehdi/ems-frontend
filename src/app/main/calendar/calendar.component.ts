import { Component, ChangeDetectionStrategy, OnInit, ViewEncapsulation } from '@angular/core';
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
    addHours
} from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from './utils/colors';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventModal } from './event-modal/event-modal.component';
import { Output, EventEmitter } from '@angular/core';

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
    screenResizeIcon: string = 'fullscreen';
    @Output() newItemEvent = new EventEmitter<boolean>();

    constructor(private http: HttpClient,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.fetchEvents();
    }

    fetchEvents(): void {
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
        /* window.open(
            `https://www.themoviedb.org/movie/${event.meta.film.id}`,
            '_blank'
        ); */
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

    onResizeClick(): void {
        if(this.screenResizeIcon === 'fullscreen'){
            this.screenResizeIcon = 'fullscreen_exit';
            this.newItemEvent.emit(true);
        }
        else{
            this.screenResizeIcon = 'fullscreen';
            this.newItemEvent.emit(false);
        }
    }

}
