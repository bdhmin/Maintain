import { Component, OnInit } from '@angular/core';
import { Firestore, doc, onSnapshot, Timestamp } from '@angular/fire/firestore';
import { Task } from 'src/app/entities/task/task.model';
import { TaskService } from './entities/task/task.service';
import { collection, addDoc } from "firebase/firestore"; 
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Maintain';

  taskList$: Observable<Task[]> = this.taskService.getTasksOfToday();

  today: Date = new Date();

  constructor(
    private taskService: TaskService,
    private firestore: Firestore,
  ) { }

  ngOnInit() {
    console.log('Maintain your productivity levels. Stay focused and stay positive.')

    // this.taskList$.subscribe((data) => {
    //   console.log('fetched', data);
    // })
  }

  addTask(task: Task) {
    this.taskService.create(task).then((data) => {
      // TODO: Can I refetch within the service instead of manually calling?
      this.taskList$ = this.taskService.getTasksOfToday();
    });

  }

}
