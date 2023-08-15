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
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateFormatService } from 'src/app/services/utils/date-format.service';
import { FireBirdService } from 'src/app/services/firebird.service';
import { FormService } from '../../../services/utils/form.service';
import { deleteData } from '../models/qualityData';
import { QualityService } from 'src/app/services/quality.service';

@Component({
  selector: 'app-modal-quality',
  templateUrl: './modal-quality.component.html',
})
export class ModalQualityComponent implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();

  size: NzButtonSize = 'default';

  tabIndex = 0;
  disabledTab = false;

  @Input() isModalVisible = false;
  @Output() isModalVisibleChange = new EventEmitter<boolean>(false);

  form!: FormGroup;
  actionForm!: FormGroup;
  editActionForm = false;
  deleteData!: deleteData;

  constructor(
    private nzMessage: NzMessageService,
    private formBuilder: FormBuilder,
    private qualityService: QualityService,
    private dateFormatService: DateFormatService,
    private fireBirdService: FireBirdService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.qualityService.disableActions$
      .pipe(takeUntil(this.destroy$))
      .subscribe((disable) => {
        this.disabledTab = disable;
      });

    this.form = this.formBuilder.group({
      ID_CLI: [null, Validators.required],
      S_QUA: [null],
      CD_OP: [null, Validators.required],
      CD_CLI: [null, Validators.required],
      NM_CLI: [null, Validators.required],
      D_QUA: [new Date(), Validators.required],
      DS_DEF: [null, Validators.required],
      newD_QUA: [null],
      DS_ART: [null],
      NM_RESP: [null, Validators.required],
      RESOL: [false],
    });
  }

  saveFormQuality() {
    if (this.form.valid) {
      this.form.patchValue({
        newD_QUA: this.dateFormatService.toServerFormat(
          this.form.get('D_QUA')?.value
        ),
      });
      this.fireBirdService
        .updateQuality(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.nzMessage.success('Registro salvo com sucesso!');
            this.showModal(false);
          },
          (err) => {
            this.nzMessage.error(
              `Erro ao salvar o registro. Cod: ${err.error.gdscode}`,
              {
                nzDuration: 4000,
              }
            ).onClose!;
          }
        );
    } else {
      this.formService.validateAllFormFields(this.form);
      this.nzMessage.error(`Revise as informações do Formulário`, {
        nzDuration: 4000,
      }).onClose!;
    }
  }

  saveActionQuality() {
    if (this.actionForm?.valid) {
      this.fireBirdService
        .updateInsertAction(this.actionForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.nzMessage.success('Registro salvo com sucesso!', {
              nzDuration: 2000,
            }).onClose!;
            this.editActionForm = !this.editActionForm;
            this.showModal(false);
          },
          (err) => {
            if (err.error.gdscode) {
              this.nzMessage.error(
                `Erro ao salvar o registro. Cod: ${err.error.gdscode}`,
                {
                  nzDuration: 4000,
                }
              ).onClose!;
            } else {
              this.nzMessage.error(`Erro ao salvar o registro. ${err}`, {
                nzDuration: 4000,
              }).onClose!;
            }
          }
        );
    } else {
      // this.formService.validateAllFormFields(this.actionForm);

      this.nzMessage.error(`Revise as informações do Formulário`, {
        nzDuration: 4000,
      }).onClose!;
    }
  }

  primaryButton() {
    if (!this.tabIndex) {
      this.saveFormQuality();
    } else if (this.tabIndex && !this.editActionForm) {
      this.actionForm?.patchValue({ NM_RESP: null, DS_ACA: null, S_ACA: null });
      this.editActionForm = true;
    } else if (this.tabIndex && this.editActionForm) {
      this.saveActionQuality();
    }
  }

  backCancelButton() {
    if (!this.tabIndex) {
      this.showModal(false);
    } else if (this.tabIndex && !this.editActionForm) {
      this.showModal(false);
    } else if (this.tabIndex && this.editActionForm) {
      this.editActionForm = false;
    }
  }

  onChangeTab(event: any): void {
    this.tabIndex = event.index;
  }

  showModal(event: any): void {
    this.isModalVisible = event;
    this.isModalVisibleChange.emit(event);
  }

  popConfirm() {
    if (!this.tabIndex) {
      console.log(this.form.value);
      this.deleteData = {
        table: 'PCP_OP_QUA',
        ID_CLI: this.form.get('ID_CLI')?.value,
        S_QUA: this.form.get('S_QUA')?.value,
        S_ACA: 0,
      };
      this.callDeleteData(this.deleteData);
    } else {
      this.deleteData = {
        table: 'PCP_OP_QUA_ACA',
        ID_CLI: this.actionForm.get('ID_CLI')?.value,
        S_QUA: this.actionForm.get('S_QUA')?.value,
        S_ACA: this.actionForm.get('S_ACA')?.value,
      };
      this.callDeleteData(this.deleteData);
    }
  }

  callDeleteData(data: deleteData): void {
    this.fireBirdService
      .delete(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.nzMessage.success('Item Excluído' + res);
          this.showModal(false);
        },
        (error) => {
          this.nzMessage.error(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
