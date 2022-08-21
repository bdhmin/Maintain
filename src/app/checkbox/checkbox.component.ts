import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Output() checked = new EventEmitter<boolean>();

  @Input() checkedStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCheckbox() {
    this.checkedStatus = !this.checkedStatus;
    console.log(this.checkedStatus);
    this.checked.emit(this.checkedStatus);
  }

}
