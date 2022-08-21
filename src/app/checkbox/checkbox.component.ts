import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Output() checked = new EventEmitter<boolean>();

  @Input() completed: boolean | undefined = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCheckbox() {
    this.completed = !this.completed;
    this.checked.emit(this.completed);
  }

}
