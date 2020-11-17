import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatSort, MatDialog, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Subject, fromEvent } from 'rxjs';
import { ReportedService } from '../reported.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthService } from 'app/main/auth.service';
import { regexes } from 'app/main/shared/regexes';
import { CommentModal } from './comment-modal';

export interface gymsSort {
    name: string;
}

@Component({
    selector: 'reported-list',
    templateUrl: './reported-list.component.html',
    styleUrls: ['./reported-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class ReportedListComponent implements OnInit {

    dialogRef: any;
    displayedColumns: string[] = [
        'profileImage',
        'name',
        'type',
        'comment',
        'status',
        'actions',
    ];

    filters = [
        { name: 'Reported', value: 'reported' },
        { name: 'Blocked', value: 'blocked' },
        { name: 'Suspended', value: 'suspended' },
        { name: 'All', value: 'all' },
    ];
    selectedFilter: 'suspended' | 'blocked' | 'reported' | 'all' = 'all';
    userTypes: 'Trainer' | 'Client';
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
    regexesCopy = regexes;
    comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non congue odio. Aliquam maximus nisl tortor, sit amet tempus enim luctus pellentesque. Aenean quis interdum lacus. Sed ornare egestas eros, in placerat turpis dignissim at. Quisque fermentum augue mi. Cras varius est vel ligula accumsan vestibulum. Vestibulum ante ipsum primis.';

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('SearchInput') SearchInput: ElementRef;

    private _unsubscribeAll: Subject<any>;
    /* reported = [{
        name: "qasim",
        emailAddress: "qasim_123@gmail.com",
        phone: "123456789011",
        createdAt: "10/12/1998"
    }] */

    constructor(
        private reportedService: ReportedService,
        public _matDialog: MatDialog,
        private _matSnackBar: MatSnackBar,
        public authService: AuthService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update Items on changes
        this.reportedService.onPageItemChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(gymPage => {
                console.log(gymPage);
                if (this.reportedService.pageItem && this.reportedService.pageItem.content.length == 0) {
                    this.noUser = true;
                }
                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.reportedService.pageItem.content);
                this.totalLength = this.reportedService.pageItem.totalElements;
                this.limit = this.reportedService.pageItem.size;
                this.pageIndex = this.reportedService.pageItem.number;
                this.dataSource.sort = this.sort;
            });
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
                case 'type': return item.type.toLowerCase();
                case 'name': return item.name.toLowerCase();
                case 'comment': return item.comment.toLowerCase();
                case 'status': return item.status.toLowerCase();
                default: return item[property];
            }
        };
        this.subscribeSearch();
        //this.displayedColumns.push('unblock', 'activate');
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
        this.reportedService.getPageItem(event.pageIndex, event.pageSize);
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

    filterChange(e) {
        console.log(e.value);
    }

    openModal(comment: string) {
        this.dialog.open(CommentModal, {
            width: '450px',
            autoFocus: false,
            data: { comment: comment }
        });
    }
}
