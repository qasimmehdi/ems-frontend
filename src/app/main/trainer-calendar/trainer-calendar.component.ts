import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { TrainerService } from '../trainer/trainer.service';

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
    options: string[] = [];
    filteredOptions: Observable<string[]>;
    selectedFilter: "1" | "2" | "5" | "10" | "" = "";
    @ViewChild('SearchInput') SearchInput: ElementRef;
    private _unsubscribeAll: Subject<any>;
    calendarExpanded: boolean = false;

    constructor(
        private trainerService: TrainerService,
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

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    selected(value: string) {
        console.log(value);
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
                console.log("Text Changing...", text);
                this.filteredOptions = this.trainerName.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => this._filter(value))
                    );
            });
        }catch{}

    }

    filterClick(buttonName: "1" | "2" | "5" | "10"): void{
        this.selectedFilter = this.selectedFilter === buttonName ? "" : buttonName;
        //console.log(this.pageIndex, this.limit);
        //this.trainerService.getPageItem(0, this.limit, this.selectedFilter);
    }

    resizeScreen(event: boolean):void{
        this.calendarExpanded = event;
    }
}