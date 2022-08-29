import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Task } from 'src/app/entities/task/task.model';
import { TaskService } from '../../entities/task/task.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() task: Task = {
    __id: '',
    _createdAt: Timestamp.now(),
    name: '',
    description: '',
    completeBy: null,
    completed: false,
    completedAt: null,
    isHabit: false,
  };

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  isCompleted() {
    if (this.task.isHabit) {
      const startOfDay = Timestamp.fromMillis(new Date().setHours(0, 0, 0, 0));
      const endOfDay = Timestamp.fromMillis(new Date().setHours(24, 0, 0, 0));
      const latestCompletion = this.getLatestCompletionDate(this.task);

      // console.log('bool', !!latestCompletion && startOfDay <= latestCompletion && latestCompletion <= endOfDay)
      return !!latestCompletion && startOfDay <= latestCompletion && latestCompletion <= endOfDay;
    } else {
      return this.task.completed;
    }
  }

  getLatestCompletionDate(task: Task) {
    return (task.completions??[])[(task.completions?.length??1)-1] ?? null;
  }

  setCheckbox(completed: boolean) {
    if (this.task.isHabit) {
      if (completed) {
        this.task.completions?.push(Timestamp.now());
      } else {
        this.task.completions?.pop();
      }
    } else {
      this.task.completed = completed;
      this.task.completedAt = completed ? Timestamp.now() : null;
    }
    console.log('updating', this.task);
    this.taskService.update(this.task);
  }

  setTask() {
    this.taskService.update(this.task);
  }

}
