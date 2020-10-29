import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [CalendarHeaderComponent],
  exports: [CalendarHeaderComponent],
})
export class DemoUtilsModule { }
