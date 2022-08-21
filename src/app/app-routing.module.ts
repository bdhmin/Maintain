import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'task', loadChildren: () => import('./features/task/task.module').then(m => m.TaskModule) }, { path: 'habit', loadChildren: () => import('./features/habit/habit.module').then(m => m.HabitModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
