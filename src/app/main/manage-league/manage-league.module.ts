import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { ManageLeagueComponent } from './manage-league.component';

const routes: Routes = [
  {
      path     : 'manage-league',
      component: ManageLeagueComponent,
      canActivate: [AuthGuard]
  },
  {
    path     : 'manage-league/:id',
    component: ManageLeagueComponent,
    canActivate: [AuthGuard]
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
