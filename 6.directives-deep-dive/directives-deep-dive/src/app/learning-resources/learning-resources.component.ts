import { Component } from '@angular/core';
import {SafeLinkDirective} from "../safe-link.directive"

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  imports: [SafeLinkDirective],
  standalone: true,
})
export class LearningResourcesComponent {}
