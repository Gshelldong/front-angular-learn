import { Component } from '@angular/core';

@Component({
  // button[appButton] 选择器是 “限定 button 标签 + 必须带 appButton 属性” 的组合规则，保证组件只能用在符合条件的 button 上
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

}
