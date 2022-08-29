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
    isHabit: false,
  }

  constructor() { }

  ngOnInit(): void {
  }

  taskTypeIcon() {
    return this.newTask.isHabit ? '/assets/icons/add-habit-black.svg' : '/assets/icons/add-habit-grey.svg';
  }

  toggleIsHabit() {
    this.newTask.isHabit = !this.newTask.isHabit;
  }

  createTask() {
    this.addTask.emit(this.newTask);
    this.resetTaskTemplate();
  }

  resetTaskTemplate() {
    this.newTask = {
      name: '',
      isHabit: this.newTask.isHabit,
    }
  }

}
