import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
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
    selectedTrainerId: string;
    idFromRoute$: Observable<Params>;
    selectedTrainerName: string = '';

    constructor(
        private trainerCalendarService: TrainerCalendarService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this.subscribeSearch();
        this.idFromRoute$ = this.route.params;
        this.idFromRoute$.subscribe(res => {
            console.log(res);
            this.selectedTrainerId = res.id;
            this.selectedTrainerName = res.name;
        })
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
                                    this.options.push({ name: e.name, id: e.authId })
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
    }

    resizeScreen(event: boolean): void {
        this.calendarExpanded = event;
    }

    trainerSelected(trainerId: string, name: string): void {
        this.router.navigateByUrl(`/calendar/${name}/${trainerId}`);
    }
}