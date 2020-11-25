import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material';
import { LeagueService } from '../../services/league.service';
import { Router } from '@angular/router';

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
    'more',
  ];
  dataSource;
  noUser: boolean = false;



  constructor(
    private service: LeagueService,
    private router: Router) { }

  ngOnInit() {
    this.service.getLeague().then((x: any) => {
      this.dataSource = x;
      this.noUser = x.length > 0 ? false : true;
    }).catch(err => {
      console.log(err)
    })
  }

  joinLeague(id) {
    this.service.postJoinLeague(id)
      .then(res => {
        console.log(res);
        this.router.navigateByUrl('/dashboard');
      })
      .catch(err => {
        console.log(err);

      })
  }

}
