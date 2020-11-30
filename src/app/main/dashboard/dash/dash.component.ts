import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import { EventModal } from 'app/main/event-modal/event-modal.component';

export const BASE_URL_DEBUG = "https://employee-webeng.herokuapp.com";
export const BASE_URL = "https://employee-webeng.herokuapp.com";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
  animations: fuseAnimations
})

export class DashComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'fatherName',
    'cnic',
    'email',
    'grade',
    'joinDate',
    'allowances',
    'allowedLeaves',
    'remainingLeaves',
    'edit',
    'delete'
  ];
  employees: MatTableDataSource<any>;
  moment = moment;
  noEmployees: boolean = true;

  constructor(private http: HttpClient,
    private snackbar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  deleteEmp(id) {
    this.http.delete(BASE_URL_DEBUG + '/admin/deleteEmployee/' + id)
      .subscribe((res) => {
        console.log(res);
        this.getAllEmployees();
        this.snackbar.open("Employee deleted succuessfully", "OK", {
          verticalPosition: 'bottom',
          duration: 3000
        });
      },
        (err) => {
          console.log(err);
        }
      )
  }

  getAllEmployees() {
    this.http.get(BASE_URL_DEBUG + '/admin/getAllEmployees')
      .subscribe((res: any) => {
        this.noEmployees = res.length === 0;
        this.employees = new MatTableDataSource(res);
      },
        (err) => {
          console.log(err)
        }
      )
  }

  openDialog(data, action): void {
    let myData = JSON.parse(JSON.stringify(data));
    delete myData._id;
    myData.joinDate = moment.unix(data.joinDate).format('YYYY-MM-DD');
    console.log(myData);
    const dialogRef = this.dialog.open(EventModal, {
      width: '350x',
      height: 'inherit',
      minWidth: '350px',
      data: { action: action, id: data._id.$oid, user: myData }
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getAllEmployees();
    });
  }

  addEmp(action) {
    const dialogRef = this.dialog.open(EventModal, {
      width: '350x',
      height: 'inherit',
      minWidth: '350px',
      data: { action: action }
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getAllEmployees();
    });
  }

}
