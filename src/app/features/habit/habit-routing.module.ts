import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitComponent } from './habit.component';

const routes: Routes = [{ path: '', component: HabitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitRoutingModule { }
