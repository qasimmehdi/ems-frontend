import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { TrainerCalendarService } from './trainer-calendar.service';

interface IOptions { name: string, id: string }

@Component({
    selector: 'trainer-calendar',
    templateUrl: './trainer-calendar.component.html',
    styleUrls: ['./trainer-calendar.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})


export class TrainerCalendarComponent implements OnInit, OnDestroy {
    isSearching: boolean = false;
    trainerName = new FormControl();
    options: IOptions[] = [];
    filteredOptions: Observable<IOptions[]>;
    selectedFilter: "1" | "2" | "5" | "10" | "" = "";
    @ViewChild('SearchInput') SearchInput: ElementRef;
    private _unsubscribeAll: Subject<any>;
    calendarExpanded: boolean = false;
    noTrainersFound: boolean = false;
    showSearchLoader: boolean = false;

    constructor(
        private trainerCalendarService: TrainerCalendarService,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this.subscribeSearch();
    }

    ngOnDestroy = (): void => {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };

    private _filter(value: string): IOptions[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    subscribeSearch() {
        try {
            fromEvent(this.SearchInput.nativeElement, 'keyup')
                .pipe(
                    map((event: any) => {
                        return event.target.value.toLowerCase();
                    }),
                    debounceTime(1000),
                    distinctUntilChanged()
                )
                .subscribe((text: string) => {
                    if (text !== "") {
                        this.showSearchLoader = true;
                        this.trainerCalendarService.getTrainersByName(text)
                            .then((res: any) => {
                                this.options = [];
                                this.noTrainersFound = res.content.length === 0 ? true : false
                                res.content.forEach((e: any) => {
                                    this.options.push({ name: e.name, id: e.id })
                                });
                                this.trainerName.setValue(text);
                                this.filteredOptions = this.trainerName.valueChanges
                                    .pipe(
                                        startWith(''),
                                        map(() => { return this._filter(text) })
                                    );
                            })
                            .catch(err => console.log(err))
                            .finally(() => { this.showSearchLoader = false; });
                    } else {
                        this.options = [];
                        this.filteredOptions = new Observable<IOptions[]>();
                        this.noTrainersFound = false;
                    }

                });
        } catch (e) {
            console.log('error', e);
        }

    }

    filterClick(buttonName: "1" | "2" | "5" | "10"): void {
        this.selectedFilter = this.selectedFilter === buttonName ? "" : buttonName;
        //console.log(this.pageIndex, this.limit);
        //this.trainerService.getPageItem(0, this.limit, this.selectedFilter);
    }

    resizeScreen(event: boolean): void {
        this.calendarExpanded = event;
    }

    trainerSelected(trainerId: string): void {
        console.log(trainerId);
    }
}