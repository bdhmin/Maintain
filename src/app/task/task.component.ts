import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Task } from 'src/app/entities/task/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task = {
    __id: '',
    _createdAt: Timestamp.now(),
    name: '',
    description: '',
    completeBy: null,
    completed: false,
    completedAt: null,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
