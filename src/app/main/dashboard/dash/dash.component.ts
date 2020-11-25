import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material';

const BASE_URL = environment.baseUrl;

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
  animations: fuseAnimations
})

export class DashComponent implements OnInit {

  displayedColumns: string[] = [
    'league',
    'tournament',
    'players',
    'more'
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
      League: "My League 1",
      Tournament: "Pakistan v Srilanka",
      Players: "22"
    },
    {
      League: "My League 1",
      Tournament: "Pakistan v Srilanka",
      Players: "22"
    },
    {
      League: "My League 1",
      Tournament: "Pakistan v Srilanka",
      Players: "22"
    },
    {
      League: "My League 1",
      Tournament: "Pakistan v Srilanka",
      Players: "22"
    }
  ]

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataSource = this.data;
  }

  getDashboardData() {

  }

}
