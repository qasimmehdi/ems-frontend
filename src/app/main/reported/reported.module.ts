import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportedListComponent } from './reported-list/reported-list.component';
import { RouterModule, Routes } from '@angular/router';
import * as material from '@angular/material';
import { FuseConfirmDialogModule, FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { ReportedService } from './reported.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatToolbarModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { AuthGuard } from '../auth-guard.service';
import { InterceptorService } from '../interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../auth.service';

const routes: Routes = [
    {
        path: 'reported',
        component: ReportedListComponent,
        resolve: {
            data: ReportedService
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        ReportedListComponent,
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
        MatProgressSpinnerModule,
        MatToolbarModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
        FuseWidgetModule,
        MatDialogModule
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
        { provide: MAT_DIALOG_DATA, useValue: [] }
    ],
    exports: [
    ],
    entryComponents: [],
})
export class ReportedModule {
}
