/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireBirdService } from 'src/app/services/firebird.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';
import { actionsType, qualityTableData } from '../models/qualityData';
import { QualityService } from 'src/app/services/quality.service';

@Component({
  selector: 'app-table-quality',
  templateUrl: './table-quality.component.html',
  styleUrls: ['./table-quality.component.scss'],
})
export class TableQualityComponent implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();

  // Cores da tabela
  TrueResol = 'black';
  FalseResol = 'red';

  isLoadingData = false;
  isModalVisible = false;

  qualityTableData!: qualityTableData[];
  formData!: any;
  sysEmp!: [];
  totalItems = 10;
  currentPage = 1;
  try = 0;

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private fireBirdService: FireBirdService,
    private nzMessage: NzMessageService,
    private qualityService: QualityService
  ) {}

  ngOnInit(): void {
    this.getQualityTableData();
    this.getActionsType();
  }

  getQualityTableData() {
    if (this.qualityService.searchFormData) {
      this.formData = this.qualityService.searchFormData;
      this.sysEmp = this.qualityService.sysEmp;

      const startDate = this.datePipe.transform(
        this.formData.startDate,
        'dd.MM.yyyy'
      );

      const endDate = this.datePipe.transform(
        this.formData.endDate,
        'dd.MM.yyyy'
      );

      const SelectedCompanyId = this.formData.SelectedCompany;

      this.searchQuality(
        SelectedCompanyId,
        startDate,
        endDate,
        this.formData.hideResolved
      );
    } else {
      this.router.navigate(['']);
    }
  }

  private searchQuality(
    SelectedCompanyId: number,
    startDate: unknown,
    endDate: unknown,
    hideResolved: boolean
  ) {
    this.isLoadingData = true;
    this.fireBirdService
      .qualitySelect(SelectedCompanyId, startDate, endDate, hideResolved)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: []) => {
          this.totalItems = data.length;
          if (this.totalItems > 0) {
            this.qualityTableData = data;
            this.isLoadingData = false;
          } else {
            this.nzMessage.error('Nenhum registro localizado');
            this.router.navigate(['']);
          }
        },
        () => {
          if (this.try < 2) {
            this.try++;
            this.searchQuality(
              SelectedCompanyId,
              startDate,
              endDate,
              hideResolved
            );
          }
          this.isLoadingData = false;
        }
      );
  }

  onPageChange(event: number) {
    this.currentPage = event;
  }

  populateForm(ID_CLI?: number, S_QUA?: number): void {
    if (ID_CLI && S_QUA) {
      this.fireBirdService
        .findQualityById(ID_CLI, S_QUA)
        .subscribe((formData: never[]) => {
          this.qualityService.setModalFormQualityData(formData[0], false);
        });
    } else {
      this.formData = {
        CD_CLI: null,
        NM_CLI: null,
        ID_CLI: null,
        CD_OP: null,
        D_QUA: new Date(),
        S_QUA: null,
        DS_ART: null,
        DS_DEF: null,
        NM_RESP: null,
        RESOL: false,
        D_ADD: new Date(),
        D_EDT: new Date(),
        USU_ADD: null,
        USU_EDT: null,
        S_ACA: null,
      };
      this.qualityService.setModalFormQualityData(this.formData, true);
    }
    this.modalVisibility(true);
  }

  modalVisibility(value: boolean) {
    this.isModalVisible = value;
    this.getQualityTableData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getActionsType() {
    this.fireBirdService
      .selectFromTable('PCP_OP_QUA_TP')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: actionsType) => {
        this.qualityService.setActionOptions(data);
      });
  }
}
