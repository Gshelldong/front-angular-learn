import { Component } from '@angular/core';
import { RectComponent } from './rect/rect.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RectComponent, FormsModule],
})
export class AppComponent {
  rectSize = {
    width: '200',
    height: '200',
  };

  resetSize(sizeObj: { width: string; height: string }) {
    this.rectSize.width = sizeObj.width,
    this.rectSize.height = sizeObj.height
  }
}
