import { Component,Input,inject,Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';
import { CardComponent } from '../../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import {TasksService} from '../tasks.service';
import {ModifyTaskComponenet} from '../modify-task/modify-task.componenet'


@Component({
  selector: 'app-task',
  // imports: [CardComponent,DatePipe, ModifyTaskComponenet],
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})

export class TaskComponent {
  // 这里需要加!是为了告诉ts这个变量会传进来
  @Input({required: true}) task!: Task;
  private taskService = inject(TasksService);
  isModifyTask = false;

  // 声明一个传出的对象
  // @Output() compelete = new EventEmitter();

  // task= input.required<Task>();

  // 在点击按钮的时候把任务的id提交到输出中
  // 使用了服务注入就可以不用输出的方式了
  onCompelateTask() {
    this.taskService.removeTask(this.task.id);
  }

  onModifyTask() {
    this.isModifyTask = true;
  }
}
