import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material';
import { LeagueService } from '../../services/league.service';

const BASE_URL = environment.baseUrl;

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss'],
  animations: fuseAnimations
})

export class LeaguesComponent implements OnInit {

  displayedColumns: string[] = [
    'index',
    'name',
    'players',
  ];
  filter = 'my_gyms';
  dataSource;
  limit: number = 20;
  skip: Number = 0;
  totalLength: Number = 0;
  pageIndex: Number = 0;
  pageLimit: Number[] = [5, 10, 25, 100];
  noUser: boolean = false;
  isSorted: boolean = false;
  sortSwitch: number = 0;


  constructor(private http: HttpClient,private service:LeagueService) { }

  ngOnInit() {
    this.service.getLeague().then(x => {
      this.dataSource = x;
    }).catch(err => {
      console.log(err)
    })
  }

  getDashboardData() {

  }

}
