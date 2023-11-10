/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, filter, takeUntil } from 'rxjs';
import { FirebirdService } from 'src/app/services/firebird.service';
import { QualityService } from 'src/app/services/quality.service';

@Component({
  selector: 'app-form-quality',
  templateUrl: './form-quality.component.html',
  styleUrls: ['./form-quality.component.scss'],
})
export class FormQualityComponent implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();

  @Output() formQualityEvent = new EventEmitter<FormGroup>();
  @Input() form!: FormGroup;

  isModalVisible!: boolean;

  constructor(
    private fireBird: FirebirdService,
    private formBuilder: FormBuilder,
    private qualityService: QualityService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ID_CLI: [null, Validators.required],
      S_QUA: [null],
      CD_OP: [null, Validators.required],
      CD_CLI: [null, Validators.required],
      NM_CLI: [null, Validators.required],
      D_QUA: [new Date(), Validators.required],
      DS_DEF: [null, Validators.required],
      newD_QUA: [null],
      DS_ART: [null, Validators.required],
      NM_RESP: [null, Validators.required],
      RESOL: [false],
    });

    this.getModalData();

    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formQualityEvent.emit(this.form);
      });
  }

  private getModalData() {
    this.qualityService.modalFormQualityData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.form.patchValue({
          ID_CLI: data?.ID_CLI,
          S_QUA: data?.S_QUA,
          CD_OP: data?.CD_OP,
          CD_CLI: data?.CD_CLI,
          NM_CLI: data?.NM_CLI,
          D_QUA: data?.D_QUA,
          DS_DEF: data?.DS_DEF,
          newD_QUA: data?.newD_QUA,
          DS_ART: data?.DS_ART,
          NM_RESP: data?.NM_RESP,
          RESOL: data?.RESOL ? true : false,
        });
        this.formQualityEvent.emit(this.form);
      });
  }

  //

  getNmCli() {
    this.fireBird
      .selectFromTable(
        'CML_CLIENTE',
        'CD_CLI',
        this.form.get('CD_CLI')?.value,
        'NM_CLI, ID_CLI'
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.form.patchValue({
          NM_CLI: data[0].NM_CLI,
          ID_CLI: data[0].ID_CLI,
        });
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
