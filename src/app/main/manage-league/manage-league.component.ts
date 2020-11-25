import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeagueService } from '../../services/league.service';

const BASE_URL = environment.baseUrl;

@Component({
  selector: 'app-manage-league',
  templateUrl: './manage-league.component.html',
  styleUrls: ['./manage-league.component.scss'],
  animations: fuseAnimations
})

export class ManageLeagueComponent implements OnInit {

  leagueForm: FormGroup;

  constructor(private http: HttpClient,
     private _formBuilder: FormBuilder,
     private service:LeagueService) { }

  ngOnInit() {
    this.leagueForm = this._formBuilder.group({
      Name: ['', [Validators.required]],
      maxParticipants: ['', [Validators.required]]
  });
  }

  save(){
    this.service.addLeague(this.leagueForm.value).then(x => {
      console.log(x);
    }).catch(err => {
      console.log(err);
    })
  }

}
