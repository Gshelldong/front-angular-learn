import { Component,inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-invesment-results',
  imports: [CurrencyPipe],
  templateUrl: './invesment-results.component.html',
  styleUrl: './invesment-results.component.css',
})

export class InvesmentResultsComponent {
  // 服务注入的方式2
  private _investmentService = inject(InvestmentService);

  get results() {
    return this._investmentService.resultsData;
  }
}
