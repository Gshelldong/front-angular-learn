import { Component, signal } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {UserInputComponent} from './user-input/user-input.component';
// import { InvestmentInput } from './investment-input.model';
// import { InvestmentService } from './investment.service';
import {InvesmentResultsComponent} from './invesment-results/invesment-results.component';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('investment-caculator');
}
