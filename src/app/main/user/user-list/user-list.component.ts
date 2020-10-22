import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatSort, MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subject, fromEvent } from 'rxjs';
import { UserService } from '../user.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthService } from 'app/main/auth.service';

export interface gymsSort {
    name: string;
}

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class UserListComponent implements OnInit {

    dialogRef: any;
    displayedColumns: string[] = [
        'name',
        'id',
        'phone',
        'email',
        'registeredAt',
        'active'
    ];
    filter = 'my_gyms';
    dataSource: MatTableDataSource<any>;
    limit: number = 20;
    skip: Number = 0;
    totalLength: Number = 0;
    pageIndex: Number = 0;
    pageLimit: Number[] = [5, 10, 25, 100];
    moment = moment;
    showSearchLoader: boolean = false;
    noUser: boolean = false;
    isSorted: boolean = false;
    sortSwitch: number = 0;
    unassignedGymOwner: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('SearchInput') SearchInput: ElementRef;

    private _unsubscribeAll: Subject<any>;
    /* user = [{
        name: "qasim",
        emailAddress: "qasim_123@gmail.com",
        phone: "123456789011",
        createdAt: "10/12/1998"
    }] */

    constructor(
        private  userService: UserService,
        public _matDialog: MatDialog,
        private _matSnackBar: MatSnackBar,
        public authService: AuthService
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update Items on changes
        this.userService.onPageItemChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(gymPage => {
                console.log(gymPage);
                if (this.userService.pageItem && this.userService.pageItem.content.length == 0) {
                    this.noUser = true;
                }
                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.userService.pageItem.content);
                this.totalLength = this. userService.pageItem.totalElements;
                this.limit = this. userService.pageItem.size;
                this.pageIndex = this. userService.pageItem.number;
                this.dataSource.sort = this.sort;
            });
        this.subscribeSearch();
    }

    subscribeSearch() {
        fromEvent(this.SearchInput.nativeElement, 'keyup')
            .pipe(
                map((event: any) => {
                    return event.target.value.toLowerCase();
                }),
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe((text: string) => {
                console.log("Text Changing...", text)
            });
    }

    changePage = (event): void => {
        console.log(event.pageSize, event.pageIndex);
        this.userService.getPageItem(event.pageIndex, event.pageSize);
    };

    ngOnDestroy = (): void => {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };

    setDataSource(source) {
        this.dataSource = new MatTableDataSource(source.content);
        this.totalLength = source.totalElements;
        this.limit = source.size;
        this.pageIndex = source.number;
        this.dataSource.sort = this.sort;
    }
}
