import { Component, NgModule } from "@angular/core";
import { InitialSetup } from "./initial-setup.component";
import { RouterModule } from '@angular/router';
import { LoginService } from "../login/login.service";
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatGridList, MatIconModule, MatInputModule, MatSnackBarModule, MatStepperModule } from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";

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

        FuseSharedModule
    ],
    providers: [LoginService]
})
export class InitialSetupModule {
}