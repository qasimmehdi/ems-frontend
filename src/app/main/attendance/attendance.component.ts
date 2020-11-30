import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { LeagueService } from 'app/services/league.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BASE_URL_DEBUG } from '../dashboard/dash/dash.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  idFromRoute$: Observable<Params>;
  employeeId: string;
  url = '';
  hideQr = false;

  constructor(private router: Router,
    private _fuseConfigService: FuseConfigService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
    this.url = window.location.origin + '/attendance';
    console.log(window.location.origin);
    this.idFromRoute$ = this.route.params;
    this.idFromRoute$.subscribe(res => {
      console.log(res);
      this.employeeId = res.id;
      if (this.employeeId) {
        this.hideQr = true;
        this.http.get(BASE_URL_DEBUG + '/employee/attendance/' + this.employeeId)
          .subscribe(res => {
            console.log(res);
            this.snackbar.open("Attendance marked succuessfully", "OK", {
              verticalPosition: 'bottom',
              duration: 3000
            });
          },
            err => {
              console.log(err);
              this.router.navigateByUrl('/login/attendance');
            }
          )
      }
    })

  }
}
