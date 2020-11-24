import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FuseSharedModule } from '@fuse/shared.module';

import { RegisterComponent } from 'app/main/register/register.component';
import { RegisterService } from './register.service';
import { AuthGuard } from '../auth-guard.service';

const routes = [
    {
        path: 'register',
        component: RegisterComponent,
    }
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,

        FuseSharedModule
    ],
    providers: [RegisterService]
})
export class RegisterModule {
}
