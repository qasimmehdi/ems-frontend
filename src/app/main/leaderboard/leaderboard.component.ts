import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LeagueService } from 'app/services/league.service';

const BASE_URL = environment.baseUrl;

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  animations: fuseAnimations
})

export class LeaderboardComponent implements OnInit {

  displayedColumns: string[] = [
    'rank',
    'name',
    'points',
  ];
  dataSource: MatTableDataSource<any>;
  noData: boolean = true;
  myControl: FormControl = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;


  constructor(private http: HttpClient,
    private service: LeagueService) { }

  ngOnInit() {
    this.service.getLeague()
      .then((x: any) => {
        console.log(x);
        this.options = x;
      })
      .catch(err => console.log(err));

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((val) => {
        return this.filter(val);
      })
    );
  }

  leagueSelected(option) {
    this.dataSource = new MatTableDataSource([]);
    console.log(option);
    this.noData = false;
    this.service.getLeaderboard(option.id)
    .then((res: any) => {
      let data = res;
      data.sort(function(a, b) {
        var keyA = new Date(a.totalPoints),
          keyB = new Date(b.totalPoints);
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
      console.log('sorted ',data);
      this.dataSource = new MatTableDataSource(data);
    })
    .catch(err => console.log(err));
  }

  filter(val): any[] {
    return this.options.filter((option) => {
      console.log("filter");
      return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });
  }

}
