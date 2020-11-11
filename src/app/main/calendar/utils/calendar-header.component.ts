import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
    selector: 'mwl-demo-utils-calendar-header',
    templateUrl: './calendar-header.component.html',
    styleUrls: [
        './calendar-header.component.scss',
        '../../../../../node_modules/bootstrap-css-only/css/bootstrap.min.css'
    ],
})
export class CalendarHeaderComponent {
    @Input() view: CalendarView;

    @Input() viewDate: Date;

    @Input() locale: string = 'en';

    @Output() viewChange = new EventEmitter<CalendarView>();

    @Output() viewDateChange = new EventEmitter<Date>();

    CalendarView = CalendarView;
    @Output() screenResizeEvent = new EventEmitter<boolean>();

    screenResizeIcon: string = 'fullscreen';

    onResizeClick(): void {
        if(this.screenResizeIcon === 'fullscreen'){
            this.screenResizeIcon = 'fullscreen_exit';
            this.screenResizeEvent.emit(true);
        }
        else{
            this.screenResizeIcon = 'fullscreen';
            this.screenResizeEvent.emit(false);
        }
    }
}
