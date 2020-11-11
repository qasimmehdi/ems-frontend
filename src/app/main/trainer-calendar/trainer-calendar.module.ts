import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import * as material from '@angular/material';
import { FuseConfirmDialogModule, FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA, MatToolbarModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { AuthGuard } from '../auth-guard.service';
import { InterceptorService } from '../interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatCardModule } from '@angular/material/card';
import { TrainerCalendarComponent } from './trainer-calendar.component';
import { TrainerCalendarService } from './trainer-calendar.service';
import { DemoModule } from '../calendar/calendar.module';

const routes: Routes = [
    {
        path: 'calendar',
        component: TrainerCalendarComponent,
        /* resolve: {
            data: TrainerCalendarService
        }, */
        canActivate: [AuthGuard]
    },
    {
        path: 'calendar/:id',
        component: TrainerCalendarComponent,
        /* resolve: {
            data: TrainerCalendarService
        }, */
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        TrainerCalendarComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
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
        MatCardModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
        FuseWidgetModule,
        MatDialogModule,
        DemoModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
        AuthGuard,
        AuthService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        TrainerCalendarService
    ],
    exports: [
    ],
    entryComponents: [],
})
export class TrainerCalendarModule {
}
