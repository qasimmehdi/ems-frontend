import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageLeagueComponent } from './manage-league.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
      path     : 'manage-league',
      component: ManageLeagueComponent,
      //canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [ManageLeagueComponent]
})
export class ManageLeagueModule { }
