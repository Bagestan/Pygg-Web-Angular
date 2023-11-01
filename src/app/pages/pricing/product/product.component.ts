import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PriceFormationService } from 'src/app/services/price-formation.service';
import { FormService } from 'src/app/services/utils/form.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  protected destroy$: Subject<void> = new Subject<void>();

  @Input() productInfoLoading = true;
  @Input() showOption = true;

  form!: FormGroup;
  margin!: number;

  price = new FormControl(null, { updateOn: 'blur' });

  result =
    this.priceService.receitaLiquidaPrecoInput > 0 ? 'approved' : 'denied';

  constructor(
    private fb: FormBuilder,
    public priceService: PriceFormationService,
    private formService: FormService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      price: [this.priceService.precoCalc, [Validators.required]],
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.formService.validateAllFormFields(this.form);

      if (this.form.valid) {
        const { price } = this.form.getRawValue();
        this.priceService.calcDespesasPrecoInput(price);
      }
    });
  }
}
