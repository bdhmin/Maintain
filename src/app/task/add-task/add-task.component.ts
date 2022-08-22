  import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/entities/task/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @Output() addTask: EventEmitter<Task> = new EventEmitter();

  newTask: Task = {
    name: '',
    completeBy: null,
    completedAt: null,
  }

  constructor() { }

  ngOnInit(): void {
  }

  createTask() {
    console.log(this.newTask);
    this.addTask.emit(this.newTask);
    this.resetTaskTemplate();
  }

  resetTaskTemplate() {
    this.newTask = {
      name: '',
      completeBy: null,
      completedAt: null,
    }
  }

}
