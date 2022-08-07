import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Maintain';

  todolist: string[] = [
    'Two Leetcode Problems',
    'Continue Maintain App Development',
    'CSE 197 Daily Reflection',
  ]

  today: Date = new Date();
}
