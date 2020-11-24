import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import {
  MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LeaguesComponent } from './leagues.component';

const routes: Routes = [
  {
      path     : 'leagues',
      component: LeaguesComponent,
      //canActivate: [AuthGuard]
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
    MatTooltipModule
  ],
  declarations: [LeaguesComponent]
})
export class LeaguesModule { }
