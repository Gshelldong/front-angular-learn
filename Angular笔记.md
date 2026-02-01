# Angular笔记

笔记来自于项目：

## 安装cli

```bash
# 设置为淘宝镜像
npm config set registry https://registry.npmmirror.com
# 验证当前镜像
npm config get registry

# 安装angular
npm install -g @angular/cli

# 创建一个app
ng new start-app

要不要google添加额外的配置 N
样式表设置 CSS
SSG 设置 N
Node ai辅助工具选择
```

## 配置文件

静态文件配置

```json
angular.json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm"
  },
  "newProjectRoot": "projects",
  "projects": {
    "start-app": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/assets",  # 配置静态资产的目录比如图片
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "start-app:build:production"
            },
            "development": {
              "buildTarget": "start-app:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular/build:unit-test"
        }
      }
    }
  }
}

```

### public目录

在public目录中的静态资源可以直接通过相对路径的方式使用文件名字进行访问。

```html
<img src='image.png'alt='a moneny bag  '>
```



## 属性设置

ts中声明函数，和属性设置。

在标签中设置属性使用[]

```bash
# user.component.ts
export class UserComponent {
  selectUser = DUMMY_USERS[randomIndex];

  # 一个函数在调用的时候直接执行不需要()
  get imagePath() {
    return 'assets/users' + this.selectUser.avatar
  }
  
  onSelectUser() {
    console.log('Clicked on a user');
  }
}

# 在页面中调用直接使用
# user.component.html
<div>
  <button>
    <img [src]="imagePath"
         [alt]="selectUser.name"
    />
    <span>{{ selectUser.name }}</span>
  </button>
</div>
```

## 事件绑定

事件绑定使用()

```bash
# 就是在 user.component.ts 组件中声明的函数
<div>
  <button (click)="onSelectUser()">
    <img [src]="imagePath"
         [alt]="selectUser.name"
    />
    <span>{{ selectUser.name }}</span>
  </button>
</div>
```

2025/12/22 练习到08.

## 信号和信号计算

信号用于存储一个状态。computed用来计算新的值。

`signal`和`computed`

```bash
import { Component, computed, signal } from '@angular/core';

import { DUMMY_USERS } from '../dummy-users';

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  selectedUser = signal(DUMMY_USERS[randomIndex]);
  imagePath = computed(() => 'assets/users/' + this.selectedUser().avatar)

  // get imagePath() {
  //   return 'assets/users/' + this.selectedUser.avatar
  // }

  onSelectUser() {
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser.set(DUMMY_USERS[randomIndex]);
  }
}
```

信号在模板中调用，信号的调用要使用（）

- user.component.html

```html

<div>
  <button (click)="onSelectUser()">
    <img [src]="imagePath()"
         [alt]="selectedUser().name"
    />
    <span>{{ selectedUser().name }}</span>
  </button>
</div>
```

## Inputs方法

组件之间传递参数，值。

一个组件要接受另外一个组件中的数据可以使用这种input的方式来传递值。

```bash
# app.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component'
import { UserComponent } from './user/user.component';
import {DUMMY_USERS} from './dummy-users';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
 // 父组件的值
  users = DUMMY_USERS;
}

# app.component.html
<app-header />
<main>
  <ul id="users">
    @for (user of users;track user.id){
      <li>
         # 这里定义了要传入的变量
        <app-user [avatar]="user.avatar" [name]="user.name" />
      </li>
    }
  </ul>
</main>

# user.component.ts 子组件
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})

export class UserComponent {
  // 要接收的两个参数!是欺骗ts语法错误的
  @Input() avatar!: string;
  @Input() name!: string;
  
  // 如果参数是必填项就必须这样写
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;

  get imagePath() {
    return "assets/users/" + this.avatar;
  }

  onSelectUser() {
  }
}

# 模板中使用user.component.html
# 这里的name就是从父组件中来的
<div>
  <button (click)="onSelectUser()">
    <img [src]="imagePath"
         [alt]="name"
    />
    <span>{{ name }}</span>
  </button>
</div>

```

## input把输入作为信号处理

接收外部组件数据的另一种方式。

这是新版本的特性。

```bash
import { Component, computed, Input , input } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})

export class UserComponent {
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;

  avatar = input.required<string>();
  name = input.required<string>();

  imagePath = computed(() => {
    return "assets/users/" + this.avatar()
  })


  // get imagePath() {
  //   return "assets/users/" + this.avatar;
  // }

  onSelectUser() {

  }
}

# 模板引用 user.component.html
<div>
  <button (click)="onSelectUser()">
    <img [src]="imagePath()"
         [alt]="name()"
    />
    <span>{{ name() }}</span>
  </button>
</div>

```

2025/12/23 练习到12-required-inputs

## Output输出属性

```ts
# user.component.ts
import { Component, computed, Input , input, Output, EventEmitter, output } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})

export class UserComponent {
  @Input({required: true}) id!: string;
  @Input({ required: true }) avatar!: string;
  @Input({ required: true }) name!: string;
  @Output() select = new EventEmitter();
  
  // 这个是新版本中的方法写法更简洁
  //select = output<string>();

  // avatar = input.required<string>();
  // name = input.required<string>();

  // imagePath = computed(() => {
  //   return "assets/users/" + this.avatar()
  // })

  get imagePath() {
    return "assets/users/" + this.avatar;
  }

  onSelectUser() {
    this.select.emit(this.id)
  }
}

```

父组件的使用。

组件之间通信，有输入参数和输出参数，就像后端一样，创建组件用了多少参数，调用的时候就要与参数对应，输出组件的调用使用 (输出名)

onSelectUser($event) 是父组件触发的函数和接收的输入的参数。

```bash
# app.component.html
<app-user [avatar]="user.avatar" [name]="user.name" [id]="user.id" (select)="onSelectUser($event)" )/>

# app.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component'
import { UserComponent } from './user/user.component';
import {DUMMY_USERS} from './dummy-users';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;

  onSelectUser(id: string) {
    console.log("you select user" + id);
  }
}

```

## 参数使用

```ts
export class TasksComponent {
  // @Input({required: true}) name!: string;
  // 表示name是可选参数，可以是string也可以是未定义
  @Input() name?: string;
    
   // 直接声名
  // @Input() name: string | undefined;
}


// 三元表达式
<!-- selectedUser的值是否为空，空的就传“”，有值就传用户的名字 -->
  <app-tasks [name]="selectedUser ? selectedUser.name : ''" />
      
      
// 声名变量
selectedUserId?: string;
selectedUserId : string | undifined;
```

## 对象

对象的声名。

`interface`支持**单继承、多继承**，语法符合面向对象的直觉，可读性极强.

`type` 没有「继承」语法，想要扩展类型，只能用**交叉类型**把多个类型「合并」成新类型.

```bash
// 用户有很多的方法，可以通过interface或者type直接把用户定义为一个user对象
// type User = {
//   id: string,
//   avatar: string,
//   name: string
// }

interface User {
  id: string,
  avatar: string,
  name: string
}
```

## 数组

数组的方法

```ts
// filter方法会过滤出所有的，函数中是true的
get selectUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId);
  }
```

```ts
// find方法只会返回成功之后的第一个，里面传入一个函数
  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }
```

```ts
// 语法1：添加单个元素
数组.unshift(元素1);

// 语法2：添加多个元素（用逗号分隔）
数组.unshift(元素1, 元素2, 元素3, ...);
```

`unshift`方法会在数组开头的位置增加一个元素，并返回添加之后的数组长度。

## for循环

`users`是一个数组。

```html
<app-header />

<main>
  <ul id="users">
    @for (user of users; track user.id) {
      <li>
        <app-user [user]="user" (select)="onSelectUser($event)" />
      </li>
    }
  </ul>

  <app-tasks [name]="selectedUser ? selectedUser.name : ''" />
</main>
```



## if判断

```html
  @if (selectedUser) {
    <!-- selectedUser的值是否为空，空的就传“”，有值就传用户的名字 -->
    <app-tasks [name]="selectedUser ? selectedUser.name : ''" />

  } @else {
    <p id="fallback">Select a user to see their tasks!</p>
  }
```

老版本的if判断和for

```ts
// 依赖这两个模块
import { NgFor, NgIf } from '@angular/common';
```

新版本的更简洁。

```html
<main>
  <ul id="users">
    <!-- @for (user of users; track user.id) { -->
      <li *ngFor="let user of users">
        <app-user [user]="user" (select)="onSelectUser($event)" />
      </li>
    <!-- } -->
  </ul>

  <!-- @if (selectedUser) { -->
    <app-tasks *ngIf="selectedUser; else fallback" [name]="selectedUser!.name" />
  <!-- } @else { -->
    <ng-template #fallback>
      <p id="fallback">Select a user to see their tasks!</p>
    </ng-template>
  <!-- } -->
</main>
```

## 语法记录

```ts
[class.active]="selected"  selected是一个布尔值，

//当 selected = true 时，元素会自动添加 active 类 → 元素最终会有 class="active"；
//当 selected = false 时，元素会自动移除 active 类 → 元素不会包含 active 类。
```

## 双向绑定

`FormsModule`在导入之后会自动接管<forms>标签，而且会阻止默认的浏览器提交行为。

```ts
// 依赖模块
import {FormsModule} from '@angular/forms';


// 模板中使用
[(ngModel)]="enteredDate"
```

## ng-content

比如这个组件有一个公共的样式，我们把这个去装饰其他的组件。需要在标签中加入<ng-content />才能正常的把装饰组件中的内容显示出来。

```bash
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  standalone: true,
  template: `<div>
              <ng-content />
            </div>`,
  styleUrl: './card.component.css',
})
export class CardComponent {

}

# 其他组件引用
// 把其他的组件装饰在中间
<app-card>
  <article>
    <h2>{{ task.title }}</h2>
    <time>{{ task.dueDate }}</time>
    <p>{{ task.summary }}</p>
    <p class="actions">
      <button (click)="onCompelateTask()">Complete</button>
    </p>
  </article>
</app-card>
```

## 管道

参考地址：https://angular.cn/guide/templates/pipes#

管道的作用就是把输出的变量再进行处理，管道还可以添加额外的参数。

日期管道

```ts
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [CardComponent,DatePipe],
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})

<time>{{ task.dueDate | date:'fullDate' }}</time>
```

## 服务

**服务（Service）** 是**单例的、注入式的类**，核心作用是**抽离公共业务逻辑、数据交互、工具方法**，实现组件与组件、组件与数据层的解耦，是 Angular 中实现**跨组件数据共享、统一业务管理**的核心方案。

一个服务无论被多少个组件 / 指令 / 其他服务注入，Angular 只会创建唯一的一个实例。

一个服务只做一件事。

```bash
import { Injectable } from '@angular/core';

# 全局可用
@Injectable({ providedIn: 'root' })
export class TaskService {
	// ......
}
```

一个完整的示例

```ts
import {Injectable} from "@angular/core";
import {type NewTaskData} from './task/task.model';


@Injectable({providedIn: 'root'})
export class TasksService {
  private tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }
  // 查
  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  // 增
  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });

    this.saveTask();

  }

  // 删
  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTask();
  }

  alterTask(id: string) {
    // 修改
  }

  private saveTask() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

```

对服务的引用，这样就实现了组件与数据层的解耦。

tasks.component.ts

```ts
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

```

使用服注入的方式

```ts
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
  // 这里定义的变量在ts中使用双向绑定，这样就实现了用户在表单输入这里的变量就直接获取到用户输入的值然后直接进行处理。
  enteredTitle = '';
  enteredSummary = '';
  enteredDate: string = '';
   
  // 使用注入的方式
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

```

再次把`tasks.component.ts`解耦合。

```ts
import { Component,Input,inject,Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';
import { CardComponent } from '../../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import {TasksService} from '../tasks.service';


@Component({
  selector: 'app-task',
  imports: [CardComponent,DatePipe],
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})

export class TaskComponent {
  // 这里需要加!是为了告诉ts这个变量会传进来
  @Input({required: true}) task!: Task;
  private taskService = inject(TasksService);

  // 声明一个传出的对象
  // @Output() compelete = new EventEmitter();

  // task= input.required<Task>();

  // 在点击按钮的时候把任务的id提交到输出中
  // 使用了服务注入就可以不用输出的方式了
  onCompelateTask() {
    this.taskService.removeTask(this.task.id);
  }
}

```

从上面两种不同的引用服务的方式可以得出结论，用户数据交互独立成服务之后在不同的组件中就可直接调用服务来进行数据处理，与输入输出处理数据的方式相比，处理数据更加高效，代码更加简洁。

## 表单

```ts
import { FormsModule } from '@angular/forms';
```

在html中的使用

```html
<form (ngSubmit)="onSubmit()">
</form>
```



## 老项目模块启动

### 方法一:组件和模块混合使用

使用模块的方式启动angular项目。

修改入口文件`main.ts`

模块方式启动，下面的写法是必须的。

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

`AppModule`文件的定义：

可启动的模块必须要导入一个模块`BrowserModule`在整个项目中这个模块只能够被导入一次。

`BrowserModule`包含了一些可以直接使用的模块，比如`DatePipe`所以有的组件在成为moduls之后可以不用再导入。

`NgModule`负责把所有的模块或者是独立的组件组装起来。

从这里可以看出来，独立模块和组件是可以一起出现在项目中的。

app.module.ts

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent], // 启动的参数
  imports: [BrowserModule, HeaderComponent, UserComponent, TasksComponent],
})
export class AppModule {}

```

### 方法二:全部使用模块

把所有的组件都修改成模块的方式，但是这种方式不容易看出来哪些标签是从哪里的组件中来的，不利于维护。简单来说就没有层级关系了，所有的导入和引用都是杂揉在一起的。

模块中依赖的框架组件还是需要在`imports`中导入。

app.module.ts

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import {TaskComponent} from './tasks/task/task.component';
import {NewTaskComponent} from './tasks/new-task/new-task.component';
import {CardComponent} from '../shared/card/card.component';
import {ModifyTaskComponenet} from './tasks/modify-task/modify-task.componenet';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    TasksComponent,
    TaskComponent,
    NewTaskComponent,
    CardComponent,
    ModifyTaskComponenet
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule, FormsModule],
})
export class AppModule {}

```

作为模块的组件`NewTaskComponent`，现在修改为。

`standalone: false` 其中依赖的`FormsModule` 从`main.ts`中的`imports`中声名了。

```ts
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  // imports: [FormsModule],作为模块禁止使用独立功能
  standalone: false,
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

```

### 方法三:使用多模块分组的方式

把相同功能的模块使用`NgModule`的方式进行先进行组合，然后在`main.ts`再进行总的组合。

把`TasksModule`进行改造。

app.module.ts

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, SharedModule, TasksModule],
})
export class AppModule {}
```

`CommonModule` 是 Angular 提供的核心模块之一，它主要为 Angular 应用提供**通用的、跨组件的基础指令和管道**，是构建 Angular 模板的基础。可以提供常用的方法比如:

- 结构型指令
  - `*ngIf`：条件渲染元素
  - `*ngFor`：循环渲染列表
  - `*ngSwitch`/`*ngSwitchCase`/`*ngSwitchDefault`：多条件分支渲染
- 属性型指令
  - `ngClass`：动态添加 / 移除 CSS 类
  - `ngStyle`：动态设置内联样式

- 提供常用内置管道 
  - `async`：处理异步数据（Observable/Promise）
  - `json`：将对象转为 JSON 字符串
  - `slice`：截取数组 / 字符串

tasks.module.ts

```ts
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
  exports:[TaskComponent], // 因为整个组件是针对这个ts作为入口所以要在这里声名导出
  imports:[CommonModule, FormsModule, SharedModule],
})

export class TasksModule {}
```

