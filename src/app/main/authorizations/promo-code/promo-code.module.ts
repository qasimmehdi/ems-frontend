import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule } from '@fuse/components';
import {PromoCodeComponent} from './promo-code.component';
import { AppAuthGuard } from 'app/app.authguard';

const routes = [
    {
        path     : 'promo-code',
        component: PromoCodeComponent,
        //canActivate: [AppAuthGuard]
    }
];

@NgModule({
    declarations: [
        PromoCodeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
        FuseCountdownModule
    ]
})
export class PromoCodeModule
{
}
