import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitRoutingModule } from './habit-routing.module';
import { HabitComponent } from './habit.component';


@NgModule({
  declarations: [
    HabitComponent
  ],
  imports: [
    CommonModule,
    HabitRoutingModule
  ]
})
export class HabitModule { }
