import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { AttendanceComponent } from './attendance.component';
import { QRCodeModule } from 'angularx-qrcode';

const routes: Routes = [
  {
    path: 'attendance',
    component: AttendanceComponent,
  },
  {
    path: 'attendance/:id',
    component: AttendanceComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    QRCodeModule,
    MatSnackBarModule
  ],
  declarations: [AttendanceComponent]
})
export class AttendanceModule { }
