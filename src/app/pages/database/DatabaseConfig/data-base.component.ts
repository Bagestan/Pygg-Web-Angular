import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
import { RealtimeDatabaseService } from 'src/app/services/realtime-database.service';
import { FormService } from 'src/app/services/utils/form.service';

interface firebirdConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

@Component({
  selector: 'app-data-base',
  templateUrl: './data-base.component.html',
  styleUrls: ['./data-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataBaseComponent implements OnInit {
  protected destroy$: Subject<void> = new Subject<void>();

  form!: FormGroup;
  config!: firebirdConfig;

  ngOnInit(): void {
    this.message.loading('');
  }

  constructor(
    private fb: FormBuilder,
    private realtime: RealtimeDatabaseService,
    private formService: FormService,
    private message: NzMessageService
  ) {
    this.getConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.message.remove();
          if (data) {
            this.config = data;
            this.populateForm();
          } else {
            this.message.error('Configuração não encontrada');
          }
        },
        error: (error) => {
          this.message.error(error);
          console.error(error);
        },
      });

    this.buildform();
  }

  getConfig(): Observable<firebirdConfig> {
    return this.getCompany().pipe(
      switchMap((company: string) => {
        return this.realtime.getData(`clientes/${company}/config/database`);
      }),
      map((data) => {
        return data as firebirdConfig;
      })
    );
  }

  buildform() {
    this.form = this.fb.group({
      host: [null, [Validators.required]],
      port: [null, [Validators.required]],
      database: [null, [Validators.required]],
      user: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  populateForm() {
    this.form.patchValue({
      host: this.config.host,
      port: this.config.port,
      database: this.config.database,
      user: this.config.user,
      password: this.config.password,
    });
  }

  submitForm() {
    this.formService.validateAllFormFields(this.form);

    if (this.form.value) {
      const { host, port, database, user, password } = this.form.value;
      const config: firebirdConfig = {
        host: host,
        port: port,
        database: database,
        user: user,
        password: password,
      };

      this.saveConfig(config);
    }
  }

  saveConfig(config: firebirdConfig) {
    this.getCompany()
      .pipe(takeUntil(this.destroy$))
      .subscribe((company: string) => {
        this.realtime
          .saveData(`clientes/${company}/config/database`, config)
          .subscribe({
            next: () => {
              this.message.success('Configuração salva');
            },
            error: (error) => {
              this.message.error('Erro ao salvar configuração', error);
            },
          });
      });
  }

  private getCompany(): Observable<string> {
    return this.realtime
      .getUserProfile(this.realtime.getUid())
      .pipe(map((userData: any) => userData['company']));
  }
}
