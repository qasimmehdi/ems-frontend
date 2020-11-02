import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatSort, MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subject, fromEvent } from 'rxjs';
import { TrainerService } from '../trainer.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthService } from 'app/main/auth.service';

export interface gymsSort {
    name: string;
}

@Component({
    selector: 'trainer-list',
    templateUrl: './trainer-list.component.html',
    styleUrls: ['./trainer-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class TrainerListComponent implements OnInit {

    dialogRef: any;
    displayedColumns: string[] = [
        'name',
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

    selectedFilter: "verified" | "unverified" | "rejected" | "" = "";


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('SearchInput') SearchInput: ElementRef;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private trainerService: TrainerService,
        public _matDialog: MatDialog,
        private _matSnackBar: MatSnackBar,
        public authService: AuthService
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update Items on changes
        this.trainerService.onPageItemChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.noUser = false;
                if (this.trainerService.pageItem && this.trainerService.pageItem.content.length == 0) {
                    this.noUser = true;
                }
                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.trainerService.pageItem.content);
                this.totalLength = this.trainerService.pageItem.totalElements;
                this.limit = this.trainerService.pageItem.size;
                this.pageIndex = this.trainerService.pageItem.number;
                this.dataSource.sort = this.sort;
            });
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
                case 'registeredAt': return new Date(item.createdAt);
                default: return item[property];
            }
        };
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
                console.log("Text Changing...", text);
                this.trainerService.getPageItem(0, this.limit, this.selectedFilter, text);
            });
    }

    changePage = (event): void => {
        console.log(event.pageSize, event.pageIndex);
        this.trainerService.getPageItem(event.pageIndex, event.pageSize, "");
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

    filterClick(buttonName: "verified" | "unverified" | "rejected"): void {
        this.selectedFilter = this.selectedFilter === buttonName ? "" : buttonName;
        //console.log(this.pageIndex, this.limit);
        this.trainerService.getPageItem(0, this.limit, this.selectedFilter);
    }
}
