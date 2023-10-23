import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  Subject,
  first,
  retry,
  takeUntil,
  tap,
  timeout,
} from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  actionsData,
  deleteData,
  qualityTableData,
} from '../pages/quality/models/qualityData';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from './auth.service';
import {
  ChartFilter,
  ProfitData,
} from '../pages/lucratividae/utils/chartModels';
import { DateFormatService } from './utils/date-format.service';

@Injectable({
  providedIn: 'root',
})
export class FireBirdService {
  protected destroy$: Subject<void> = new Subject<void>();
  private readonly API = 'http://localhost:3000/';

  token!: string | null;
  header!: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private message: NzMessageService,
    private DateFormat: DateFormatService
  ) {
    this.getToken();
  }

  getPrintingProductionData(
    company: string,
    startDate: Date,
    endDate: Date,
    data: string
  ) {
    return this.httpClient
      .post(
        `${this.API}printProduction/${data}`,
        {
          company: company,
          startDate: this.DateFormat.formatDateBR(startDate),
          endDate: this.DateFormat.formatDateBR(endDate),
        },
        { headers: this.header }
      )
      .pipe(
        retry(2),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  getChartData(data: ChartFilter): Observable<ProfitData[]> {
    return this.httpClient
      .post<ProfitData[]>(
        `${this.API}lucratividade/${data.chartData}`,
        {
          startDate: data.startDate,
          endDate: data.endDate,
          maxChartItems: data.maxChartItems,
          chartType: data.chartType,
          chartData: data.chartData,
          chartFields: data.chartFields,
        },
        {
          headers: this.header,
        }
      )
      .pipe(
        retry(2),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  getToken() {
    this.auth.idToken$
      .pipe(
        takeUntil(this.destroy$),
        tap({
          error: (error) => this.message.error(error),
        })
      )
      .subscribe((result) => {
        this.token = result;
        this.headerBuilder();
      });
  }

  headerBuilder(): void {
    this.header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
  }

  selectFromTable(
    table: string,
    columnToFilter?: string,
    id?: number,
    returnData?: string
  ): Observable<any> {
    const data = {
      table: table,
      columnToFilter: columnToFilter || undefined,
      id: id || undefined,
      returnData: returnData || undefined,
    };

    return this.httpClient
      .post<[]>(`${this.API}quality/selectById`, data, {
        headers: this.header,
      })
      .pipe(
        first(),
        retry(2),
        timeout(10000),
        tap({
          error: () => {
            this.message.remove();
            return this.message.error(
              'Não foi possível consultar a lista de empresas no banco de dados'
            );
          },
        })
      );
  }

  findQualityById(ID_CLI: number, S_QUA: number) {
    return this.httpClient
      .get<[]>(`${this.API}quality/quality/${ID_CLI}/${S_QUA}`, {
        headers: this.header,
      })
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  qualitySelect(
    id: number,
    startDate: unknown,
    endDate: unknown,
    hideResolved: boolean
  ) {
    return this.httpClient
      .post<[]>(
        `${this.API}quality/select/PCP_OP_QUA`,
        {
          ID_CLI: id,
          startdate: startDate,
          enddate: endDate,
          hideResolved: hideResolved,
        },
        { headers: this.header }
      )
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  getActionQuality(id: number, squa: number) {
    return this.httpClient
      .get<[]>(`${this.API}quality/qualityAction/${id}/${squa}`, {
        headers: this.header,
      })
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  updateQuality(data: FormGroup) {
    return this.httpClient
      .post<qualityTableData>(`${this.API}quality/updateQuality`, data, {
        headers: this.header,
      })
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  customerSearch(searchPrompt: string) {
    return this.httpClient
      .post(
        `${this.API}quality/searchClientByName`,
        { searchPrompt },
        { headers: this.header }
      )
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  getReference(reference: number) {
    return this.httpClient
      .post(
        `${this.API}quality/getReference`,
        { reference },
        { headers: this.header }
      )
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  updateInsertAction(data: FormGroup) {
    return this.httpClient
      .post<[]>(`${this.API}quality/upOrInAction`, data, {
        headers: this.header,
      })
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  deleteAction(data: actionsData) {
    return this.httpClient
      .post<[]>(`${this.API}quality/deleteAction`, data, {
        headers: this.header,
      })
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  delete(deleteData: deleteData) {
    return this.httpClient
      .post<[]>(`${this.API}quality/deleteQuality/`, deleteData, {
        headers: this.header,
      })
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }
}
