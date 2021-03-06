import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { navigation } from 'app/navigation/navigation';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { LOG_OUT } from 'app/store/actions/user.actions';

const moment = require('moment');
const BASE_URL = environment.baseUrl;

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    user: any;
    notifications = [];

    // Private
    private _unsubscribeAll: Subject<any>;
    private user$: Observable<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private router: Router,
        private http: HttpClient,
        private store: Store<AppState>,
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.getUser();
    }

    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });
        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    search(value): void {
        // Do your search here...
        console.log(value);
    }

    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    logout() {
        localStorage.removeItem('access_token');
        this.store.dispatch({
            type: LOG_OUT,
            payload: {}
        });
        this.router.navigateByUrl('login');
    }

    changePassword() {
        this.router.navigateByUrl(`/teams/change-password/1`);
    }

    async getUser() {
        this.user$ = this.store.pipe(select('user'));
        this.user$.subscribe(resp => {
            this.user = resp.data.myProfile;
            console.log(resp);
        });
    }

    getNotifications() {
        this.http.get(`${BASE_URL}/api/notificationservice/v1/notification/getMyNotification?sort=createdAt,desc`)
            .subscribe((res: any) => {
                if (res.content && res.content.length > 5) {
                    this.notifications = res.content.splice(0, 5)
                } else {
                    this.notifications = res.content;
                }
            }, err => {
                console.log(err)
            })
    }

    resetNotifications() {
        this.notifications = [];
    }

    viewAllNotifications(event) {
        event.stopPropagation();
        this.router.navigateByUrl('/notifications')
    }

    ViewTimeAgo(date) {
        return moment(date).fromNow();
    }
}
