/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FireBirdService } from '../../../../services/firebird.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil, filter } from 'rxjs';
import { actionsData } from '../../models/qualityData';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DateFormatService } from 'src/app/services/utils/date-format.service';
import { QualityService } from 'src/app/services/quality.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();

  @Output() editActionFormEvent = new EventEmitter<boolean>();
  @Output() closeModalEvent = new EventEmitter<any>();
  @Output() actionFormEvent = new EventEmitter<FormGroup>();
  actionForm!: FormGroup;

  size: NzButtonSize = 'default';

  isLoading = false;

  @Input() editActionForm = false;
  actionList!: any;
  actionOptions!: any;

  S_QUA!: number;
  ID_CLI!: number;

  constructor(
    private fireBirdService: FireBirdService,
    private formBuilder: FormBuilder,
    private nzMessage: NzMessageService,
    private dateFormatService: DateFormatService,
    private qualityService: QualityService
  ) {}

  ngOnInit(): void {
    this.getActions();
    this.actionForm = this.formBuilder.group({
      ID_CLI: [null],
      S_QUA: [null],
      S_ACA: [null],
      D_ACA: [new Date(), Validators.required],
      DS_ACA: [null, Validators.required],
      TP_ACA: [2],
      NM_RESP: [null, Validators.required],
      D_ADD: [null],
      D_EDT: [null],
      USU_ADD: [null],
      USU_EDT: [null],
      newD_ACA: [null],
      // CD_OP: [null],
    });

    this.actionForm.patchValue({
      newD_ACA: this.dateFormatService.toServerFormat(
        this.actionForm.get('D_ACA')?.value
      ),
    });

    this.actionForm.valueChanges
      .pipe(filter(() => this.actionForm.valid))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.actionFormEvent.emit(this.actionForm);
      });
  }

  editAction(data: actionsData): void {
    if (data.TP_ACA === 2) {
      this.actionForm.patchValue({
        ID_CLI: data.ID_CLI,
        S_QUA: data.S_QUA,
        S_ACA: data.S_ACA,
        D_ACA: data.D_ACA,
        DS_ACA: data.DS_ACA,
        TP_ACA: data.TP_ACA,
        NM_RESP: data.NM_RESP,
      });
      this.editActionForm = !this.editActionForm;
      this.editActionFormEvent.emit(this.editActionForm);
    } else {
      this.nzMessage.error(
        `Não é possível editar registros de Abertura e Fechamento.`,
        {
          nzDuration: 4000,
        }
      ).onClose!;
    }
  }

  getActions() {
    this.qualityService.modalFormQualityData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.S_QUA = data?.S_QUA;
        this.ID_CLI = data?.ID_CLI;
        this.actionForm?.patchValue({ ID_CLI: data.ID_CLI, S_QUA: data.S_QUA });

        if ((this.ID_CLI, this.S_QUA)) {
          this.fireBirdService
            .getActionQuality(data.ID_CLI, data.S_QUA)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
              this.isLoading = true;
              this.actionList = data;
              this.isLoading = false;
            });
          this.actionOptions = this.qualityService.actionOptions;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
