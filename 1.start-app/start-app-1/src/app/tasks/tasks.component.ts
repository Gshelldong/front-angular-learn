import { Component, Input } from '@angular/core';
import {TaskComponent} from './task/task.component';
import {NewTaskComponent} from './new-task/new-task.component';
import {TasksService} from './tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})

export class TasksComponent {
  // @Input({required: true}) name!: string;
  // 表示name是可选参数，可以是string也可以是未定义
  @Input() name: string | undefined;
  @Input() userId!: string;
  isAddingTask = false;

  // 构造函数初始化taskService类
  constructor(private taskService: TasksService) {
  }


  get selectUserTasks() {
    return this.taskService.getUserTasks(this.userId);
  }

  // 触发函数并更新tasks列表
  // 在task app中注入了服务之后直接调用'服务'完成对数据的处理。
  // onCompelateTask(id:string) {
  //   this.taskService.removeTask(id);
  // }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  //4.把addtask的组件重置为false
  onCancelAddingTask() {
    this.isAddingTask = false;
  }

  // onAddTask(taskData: NewTaskData) {
  //   this.taskService.addTask(taskData,this.userId)
  //   this.isAddingTask = false;
  // }
}
