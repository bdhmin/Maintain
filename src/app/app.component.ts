import { Component, OnInit } from '@angular/core';
import { Firestore, Timestamp } from '@angular/fire/firestore';
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

  todolist: Task[] = [
    {
      __id: '0',
      _createdAt: Timestamp.now(),
      name: 'Leetcode',
      description: 'You can push back tasks to balance out your schedule to stay productive while not getting to overwhelmed with tasks',
      completeBy: null,
      completed: false,
      completedAt: null,
    },
    {
      __id: '1',
      _createdAt: Timestamp.now(),
      name: 'Spreading out tasks',
      description: 'You can push back tasks to balance out your schedule to stay productive while not getting to overwhelmed with tasks',
      completeBy: null,
      completed: false,
      completedAt: null,
    },
    {
      __id: '2',
      _createdAt: Timestamp.now(),
      name: 'Foresight recommendation',
      description: 'if you have an emptier day, there will be future tasks recommended for you to complete',
      completeBy: null,
      completed: false,
      completedAt: null,
    },
    {
      __id: '3',
      _createdAt: Timestamp.now(),
      name: 'Tool that generates your resume pdf',
      description: 'you can include and exclude bullet points for your resume. You can also save multiple versions of each component of the resume depending on different companies',
      completeBy: null,
      completed: false,
      completedAt: null,
    },
  ]

  today: Date = new Date();

  constructor(
    private taskService: TaskService,
    private db: Firestore,
  ) { }

  ngOnInit() {
    console.log('hello app!')
    this.taskList$.subscribe((data) => {
      console.log('fetched', data);
    })
  }

  addTask() {
    console.log('Creating task')
    const task: Task = {
      __id: '',
      _createdAt: Timestamp.now(),
      name: 'Leetcode',
      completeBy: null,
      completed: false,
      completedAt: null,
    }
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date()
    endOfDay.setHours(24, 0, 0, 0);
    console.log(startOfDay, endOfDay);

    // this.taskService.create(task);

    // try {
    //   const docRef = addDoc(collection(this.db, "tasks"), task);
    //   docRef.then((d) => {
    //     console.log('added data', d.id)
    //   });
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  }

}
