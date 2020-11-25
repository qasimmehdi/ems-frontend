import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-points',
  templateUrl: './add-points.component.html',
  styleUrls: ['./add-points.component.scss']
})
export class AddpointsComponent implements OnInit {
  options = [];
  filteredOptions: Observable<any[]>;
  myControl: FormControl = new FormControl();

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http
      .get("http://182.189.94.159:27019/api/Player/getall")
      .subscribe((x: any) => {
        this.options = x;
      });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((val) => {
        return this.filter(val);
      })
    );
  }

  filter(val): any[] {
    return this.options.filter((option) => {
      console.log("filter");
      return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });
  }

  playerSelected(option) {
    console.log(option);
  }
}
