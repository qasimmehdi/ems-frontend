import { Component, NgModule } from "@angular/core";
import { InitialSetup } from "./initial-setup.component";
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatGridList, MatIconModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule, MatSpinner, MatStepperModule } from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { InitialSetupService } from "./initial-setup.service";
import { FuseProgressBarModule } from "@fuse/components";

const routes = [
    {
        path: 'initial-setup',
        component: InitialSetup,
    }
];

@NgModule({
    declarations: [
        InitialSetup
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        MatStepperModule,
        MatChipsModule,
        FuseSharedModule,
        MatProgressSpinnerModule,
        MatProgressBarModule
    ],
    providers: [InitialSetupService]
})
export class InitialSetupModule {
}