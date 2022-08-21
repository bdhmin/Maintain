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
    console.log('hello app!')

    // this.taskList$.subscribe((data) => {
    //   console.log('fetched', data);
    // })
  }

  addTask() {
    // console.log('Creating task')
    const task: Task = {
      __id: '',
      _createdAt: Timestamp.now(),
      name: 'Leetcode',
      completeBy: null,
      completed: false,
      completedAt: null,
    }

    this.taskService.create(task);
    // TODO: Can I refetch within the service instead of manually calling?
    this.taskList$ = this.taskService.getTasksOfToday();

  }

}
