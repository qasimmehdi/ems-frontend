import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { LeaderboardComponent } from './leaderboard.component';

const routes: Routes = [
  {
      path     : 'leaderboard',
      component: LeaderboardComponent,
      canActivate: [AuthGuard]
  },
  {
    path     : 'leaderboard/:id',
    component: LeaderboardComponent,
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
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [LeaderboardComponent]
})
export class LeaderboardModule { }
