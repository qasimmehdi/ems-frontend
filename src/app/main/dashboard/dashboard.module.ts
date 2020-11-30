import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash/dash.component';
import { AuthGuard } from '../auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventModal } from '../event-modal/event-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
      path     : 'dashboard',
      component: DashComponent,
      canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [
    DashComponent,
    EventModal
  ],
  entryComponents: [EventModal]
})
export class DashboardModule { }
