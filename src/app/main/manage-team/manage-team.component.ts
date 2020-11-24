import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const BASE_URL = environment.baseUrl;

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss'],
  animations: fuseAnimations
})

export class ManageTeamComponent implements OnInit {

  displayedColumns: string[] = [
    'cricketer',
  ];
  dataSource: MatTableDataSource<any>;
  limit: number = 20;
  skip: Number = 0;
  totalLength: Number = 0;
  pageIndex: Number = 0;
  pageLimit: Number[] = [5, 10, 25, 100];
  noUser: boolean = false;
  isSorted: boolean = false;
  sortSwitch: number = 0;


  data = [];

  myControl: FormControl = new FormControl();
  teamName: FormControl = new FormControl();

  options = [
    {
      id: '1',
      name: 'Sangakara',
      type: 'rhb',
      team: 'Srilanka'
    },
    {
      id: '2',
      name: 'Mathews',
      type: 'rhb',
      team: 'Srilanka'
    }
  ];

  filteredOptions: Observable<any[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    //call api and fill options[]
    //call api and fill data[]
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => {
          if (val) {
            return this.filter(val);
          }
          else {
            return this.options;
          }
        })
      );
    this.dataSource = new MatTableDataSource(this.data);
  }

  filter(val): any[] {
    return this.options.filter(option => {
      console.log('filter')
      return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
    })
  }

  playerSelected(option) {
    console.log(option);
    if (!this.playerAlreadySelected(option.id)) {
      this.data.push(option);
      this.dataSource = new MatTableDataSource(this.data);
    }

    //this.myControl.setValue('', {emitEvent: false});
  }

  deletePlayer(i) {
    console.log(i);
    this.data = this.data.filter((_, j) => j !== i);
    console.log(this.data);
    this.dataSource = new MatTableDataSource(this.data);
  }

  saveTeam() {
    console.log(this.teamName.value);
    console.log(this.data);
  }

  playerAlreadySelected(id): boolean {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        return true;
      }
    }
    return false;
  }

}
