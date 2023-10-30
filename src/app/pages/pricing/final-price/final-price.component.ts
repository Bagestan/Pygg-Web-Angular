import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PriceFormationService } from 'src/app/services/price-formation.service';

@Component({
  selector: 'app-final-price',
  templateUrl: './final-price.component.html',
  styleUrls: ['./final-price.component.scss'],
})
export class FinalPriceComponent implements OnInit {
  constructor(
    public priceService: PriceFormationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.priceService.product && this.priceService.productCost) {
    } else {
      this.router.navigate(['main/pricing']);
    }
  }

  routeReturn() {
    this.router.navigate(['main/pricing']);

    this.priceService.resetProduct();
  }
}
