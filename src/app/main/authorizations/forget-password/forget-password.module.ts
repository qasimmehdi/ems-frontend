import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule } from '@fuse/components';
import { ForgetPasswordComponent } from './forget-password.component';
import { AppAuthGuard } from 'app/app.authguard';

const routes = [
    {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        canActivate: [AppAuthGuard]
    }
];

@NgModule({
    declarations: [
        ForgetPasswordComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
        FuseCountdownModule
    ],
    providers: [AppAuthGuard]
})
export class ForgetPasswordModule {
}
