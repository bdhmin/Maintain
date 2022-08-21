import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Task } from 'src/app/entities/task/task.model';
import { TaskService } from '../entities/task/task.service';

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

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  setCheckbox(checked: boolean) {
    this.task.completed = checked;
    if (checked) {
      this.task.completedAt = Timestamp.now();
    } else {
      this.task.completedAt = null;
    }
    this.taskService.update(this.task);
  }

}
