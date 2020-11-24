import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
     private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.leagueForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      players: ['', [Validators.required]]
  });
  }

  save(){
    console.log(this.leagueForm.value);
  }

}
