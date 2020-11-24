import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material';

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

  data = [
    {
      Rank: "1",
      Name: "Qasim",
      Points: "212"
    },
    {
      Rank: "2",
      Name: "Qasim",
      Points: "212"
    },
    {
      Rank: "3",
      Name: "Qasim",
      Points: "212"
    },
    {
      Rank: "4",
      Name: "Qasim",
      Points: "212"
    },
  ]

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataSource = this.data;
  }

  getDashboardData() {

  }

}
