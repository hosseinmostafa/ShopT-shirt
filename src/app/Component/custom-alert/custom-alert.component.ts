import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.scss'
})
export class CustomAlertComponent {
  @Input() title: string = '';
  @Input() message: string = '';

  @Input() visible: boolean = false;

  @Output() onYes = new EventEmitter<void>();
  @Output() onNo = new EventEmitter<void>();

  close() {
    this.visible = false;
  }

  onYesClick() {
    this.onYes.emit();
    this.close();
  }

  onNoClick() {
    this.onNo.emit();
    this.close();
  }
}



