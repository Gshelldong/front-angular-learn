import { Component,Input, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invesment-results',
  imports: [CurrencyPipe],
  templateUrl: './invesment-results.component.html',
  styleUrl: './invesment-results.component.css',
})

export class InvesmentResultsComponent {
  results = input<{
    year: number,
    interest: number,
    valueEndOfYear: number,
    annualInvestment: number,
    totalInterest: number,
    totalAmountInvested: number
  }[]>();
}
