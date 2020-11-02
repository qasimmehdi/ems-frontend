import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';
import { FuseConfirmDialogModule, FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatToolbarModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { ImageModal } from './image-modal.component';


@NgModule({
    declarations: [
        ImageModal
    ],
    imports: [
        CommonModule,
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
        MatDialogModule
    ],
    providers: [],
    exports: [
    ],
    entryComponents: [
        ImageModal
    ],
})
export class ImageModalModule {
}
