import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { CheckboxComponent } from './task/checkbox/checkbox.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from './task/add-task/add-task.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => 
      import('./features/task/task.module').then((m) => m.TaskModule),
      // import('./features/habit/habit.module').then((m) => m.HabitModule);
  },
];
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    CheckboxComponent,
    AddTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
