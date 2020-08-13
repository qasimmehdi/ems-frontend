import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatDialogModule
} from '@angular/material';
import {FuseConfirmDialogModule, FuseWidgetModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {AuthorizationService} from './authorization.service';
import {ResetPasswordModule} from './reset-password/reset-password.module';
import {PromoCodeModule} from './promo-code/promo-code.module';

const routes: Routes = [
];


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatDialogModule,
        ResetPasswordModule,
        PromoCodeModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
        FuseWidgetModule
    ],
    providers: [
        AuthorizationService
    ]
})
export class AuthorizationsModule {
}
