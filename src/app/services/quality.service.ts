/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { actionsType } from '../pages/quality/models/qualityData';

@Injectable({
  providedIn: 'root',
})
export class QualityService {
  searchFormData!: FormGroup;
  actionOptions!: actionsType;
  sysEmp!: [];

  private modalFormQualityData = new BehaviorSubject<any>(null);
  modalFormQualityData$ = this.modalFormQualityData.asObservable();

  private disableActions = new BehaviorSubject<any>(null);
  disableActions$ = this.disableActions.asObservable();

  setActionOptions(actions: actionsType) {
    this.actionOptions = actions;
  }

  setModalFormQualityData(item: number, disable?: boolean) {
    this.disableActions.next(disable);
    this.modalFormQualityData.next(item);
  }
}
