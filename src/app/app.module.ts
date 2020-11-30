import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
// import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from 'app/app.component';
import { fuseConfig } from 'app/fuse-config';
import { LayoutModule } from 'app/layout/layout.module';
import { environment } from 'environments/environment';
import 'firebase/firestore';
import 'hammerjs';
import { ToastrModule } from 'ngx-toastr';
import { AppAuthGuard } from './main/app.authguard';
import { AttendanceModule } from './main/attendance/attendance.module';
import { AuthGuard } from './main/auth-guard.service';
import { AuthService } from './main/auth.service';
import { AuthorizationsModule } from './main/authorizations/authorizations.module';
import { ForgetPasswordModule } from './main/authorizations/forget-password/forget-password.module';
import { ResetPasswordModule } from './main/authorizations/reset-password/reset-password.module';
import { DashboardModule } from './main/dashboard/dashboard.module';
import { ErrorInterceptor } from './main/error.interceptor';
import { InterceptorService } from './main/interceptor.service';
import { LeaderboardModule } from './main/leaderboard/leaderboard.module';
import { LeaguesModule } from './main/leagues/leagues.module';
import { LoginModule } from './main/login/login.module';
import { ManageLeagueModule } from './main/manage-league/manage-league.module';
import { ManageTeamModule } from './main/manage-team/manage-team.module';
import { RegisterModule } from './main/register/register.module';
import { userReducer } from './store/reducers/user.reducers';


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
        RegisterModule,
        DashboardModule,
        LeaderboardModule,
        ManageTeamModule,
        LeaguesModule,
        ManageLeagueModule,
        /* GymsModule,
        TeamsModule,
        SettingsModule, */
        AuthorizationsModule,
        ResetPasswordModule,
        ForgetPasswordModule,
        AttendanceModule,
        /* TeamsModule,
        UsersModule,
        ReportedModule,
        TrainerCalendarModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }), */
        // Toastr Notifications
        ToastrModule.forRoot(),
        /* InitialSetupModule, */

        //Firebase
        //FirebaseModule,
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
