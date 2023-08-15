import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalcService } from 'src/app/services/calc.service';

@Component({
  selector: 'app-calc-densidade',
  templateUrl: './calc-densidade.component.html',
  styleUrls: ['./calc-densidade.component.scss'],
})
export class CalcDensidadeComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public calcService: CalcService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      materialWeight: [0, Validators.required],
      relacaoBanho: [0],
      adicaoFuturas: [0],
      sulfato: [0],
      barrilha: [0],
      alcali: [0],
      sodaCaustica: [0],
      densidadeMedida: [0],
    });

    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.calc();
      }
    });
  }

  calc() {
    this.calcService.calc(this.form);
  }
}
