import {NgModule} from '@angular/core';
import {TasksComponent} from './tasks.component';
import {TaskComponent} from './task/task.component';
import {NewTaskComponent} from './new-task/new-task.component';
import {ModifyTaskComponenet} from './modify-task/modify-task.componenet';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent,
    NewTaskComponent,
    ModifyTaskComponenet
  ],
  exports:[TasksComponent],
  imports:[CommonModule, FormsModule, SharedModule],
})

export class TasksModule {}
