import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { DemoUtilsModule } from './utils/utils.module';
import { DemoComponent } from './calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import * as material from '@angular/material';
import { FuseConfirmDialogModule, FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDialogModule } from '@angular/material';
import { EventModal } from './event-modal/event-modal.component';

@NgModule({
    imports: [
        material.MatButtonModule,
        material.MatChipsModule,
        material.MatExpansionModule,
        material.MatFormFieldModule,
        material.MatIconModule,
        material.MatInputModule,
        material.MatPaginatorModule,
        material.MatRippleModule,
        material.MatSelectModule,
        material.MatSortModule,
        material.MatSnackBarModule,
        material.MatTableModule,
        material.MatTabsModule,
        material.MatAutocompleteModule,
        material.MatMenuModule,
        material.MatDialogModule,
        material.MatSlideToggleModule,
        material.MatTooltipModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
        FuseWidgetModule,
        MatDialogModule,
        CommonModule,
        HttpClientModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        DemoUtilsModule,

    ],
    declarations: [
        DemoComponent,
        EventModal
    ],
    exports: [DemoComponent],
    entryComponents: [EventModal]
})
export class DemoModule { }
