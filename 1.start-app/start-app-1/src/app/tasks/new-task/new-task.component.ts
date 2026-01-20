import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})

export class NewTaskComponent {
  @Input({required: true}) userId!: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTaskData>();
  // 这里定义的变量在ts中使用双向绑定可以直接处理
  enteredTitle = '';
  enteredSummary = '';
  enteredDate: string = '';
  TaskButtonName2 = 'Canal';
  taskButtonName1 = 'Create';
  taskTitle= "Add Task";
  private taskService = inject(TasksService);

  // 2.这个方法输出一个空信号表示被点击了
  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.taskService.addTask({
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate
      },
      this.userId);
    this.cancel.emit();
  }
}
