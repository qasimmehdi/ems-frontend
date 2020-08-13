import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { ResetPasswordComponent } from './reset-password.component';
import { AppAuthGuard } from 'app/app.authguard';


const routes = [
    {
        path: 'reset-password/:id',
        component: ResetPasswordComponent,
        // canActivate: [AppAuthGuard]
    }
];

@NgModule({
    declarations: [
        ResetPasswordComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class ResetPasswordModule {
}
