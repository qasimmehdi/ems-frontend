import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { LoginModule } from './main/login/login.module';
import { DashboardModule } from './main/dashboard/dashboard.module';
import { PromoCodeModule } from './main/authorizations/promo-code/promo-code.module';
import { ResetPasswordModule } from './main/authorizations/reset-password/reset-password.module';

import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './main/auth-guard.service';
import { AuthService } from './main/auth.service';
import { GymsModule } from './main/trainer/trainer.module';
import { TeamsModule } from './main/teams/teams.module';
import { HttpModule } from '@angular/http';
import { SettingsModule } from './main/settings/settings.module';
import { FirebaseModule } from './main/firebase/firebase.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthorizationsModule } from './main/authorizations/authorizations.module';
import { InterceptorService } from './main/interceptor.service';
import { ErrorInterceptor } from './main/error.interceptor';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ForgetPasswordModule } from './main/authorizations/forget-password/forget-password.module';
import 'firebase/firestore';
import { ToastrModule } from 'ngx-toastr';
import { AppAuthGuard } from './main/app.authguard';
import { InitialSetupModule } from './main/initialSetup/initial-setup.module';
import { userReducer } from './store/reducers/user.reducers';
import { UsersModule } from './main/user/user.module';
import { ReportedModule } from './main/reported/reported.module';
import { TrainerCalendarModule } from './main/trainer-calendar/trainer-calendar.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const appRoutes: Routes = [
    { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        //page modules
        LoginModule,
        DashboardModule,
        GymsModule,
        TeamsModule,
        SettingsModule,
        AuthorizationsModule,
        ResetPasswordModule,
        ForgetPasswordModule,
        TeamsModule,
        UsersModule,
        ReportedModule,
        TrainerCalendarModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        // Toastr Notifications
        ToastrModule.forRoot(),
        InitialSetupModule,

        //Firebase
        FirebaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,

        // ngrx Redux
        StoreModule.forRoot({
            user: userReducer
        })
    ],
    providers: [
        // {
        //     provide : LocationStrategy ,
        //     useClass: HashLocationStrategy
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        AuthGuard,
        AuthService,
        AppAuthGuard
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
