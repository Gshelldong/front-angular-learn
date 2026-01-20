import { Component } from '@angular/core';

@Component({
  selector: 'app-modify-task',
  // imports: [],
  standalone: false,
  templateUrl: './modify-task.componenet.html',
  styleUrl: './modify-task.componenet.css',
})

export class ModifyTaskComponenet {
  modifyTaskStatus = false;

  onClickEdit() {
    if (this.modifyTaskStatus) {
    }
  }
}
