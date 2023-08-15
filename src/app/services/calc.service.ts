import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CalcService {
  volMaq = 0;
  eletro = 0;
  barrilha = 0;
  alcali = 0;
  sodaCau = 0;
  volAgua = 0;

  addSalSul = 0;
  addBarrilha = 0;
  addAlcali = 0;
  addSodaCau = 0;

  addWaterLbl = 'ADICIONAR AGUA 0,00 LITROS';
  volBanho = 0;

  calc(form: FormGroup) {
    const {
      materialWeight,
      relacaoBanho,
      adicaoFuturas,
      sulfato,
      barrilha,
      alcali,
      sodaCaustica,
      densidadeMedida,
    } = form.getRawValue();

    this.volBanho = materialWeight * relacaoBanho;

    this.eletro = sulfato * this.volBanho;

    this.barrilha = barrilha * this.volBanho;

    this.alcali = alcali * this.volBanho;

    this.sodaCau = sodaCaustica * this.volBanho;

    if (densidadeMedida > 0) {
      this.volMaq = this.eletro / densidadeMedida + adicaoFuturas;
    } else {
      this.volMaq = 0;
    }

    this.volAgua = this.volMaq - this.volBanho;

    if (this.volAgua > 0) {
      this.addWaterLbl = 'ADICIONAR PRODUTOS ACIMA';
    } else {
      this.addWaterLbl = 'ADICIONAR ÁGUA ' + this.volAgua * -1 + ' LITROS';
    }

    if (this.volAgua > 0) {
      this.addAlcali = this.volAgua * alcali;
      this.addBarrilha = this.volAgua * barrilha;
      this.addSodaCau = this.volAgua * sodaCaustica;
      this.addSalSul = this.volAgua * sulfato;
    } else {
      this.addAlcali = 0;
      this.addBarrilha = 0;
      this.addSodaCau = 0;
      this.addSalSul = 0;
    }
  }
}
