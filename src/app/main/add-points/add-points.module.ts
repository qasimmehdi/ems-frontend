import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { AddpointsComponent } from './add-points.component';

const routes: Routes = [
  {
    path     : 'add-points/:id',
    component: AddpointsComponent,
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
  ],
  declarations: [AddpointsComponent]
})
export class AddPointsModule { }
