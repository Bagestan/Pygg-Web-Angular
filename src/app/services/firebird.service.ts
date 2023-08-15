import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, first, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  actionsData,
  deleteData,
  qualityTableData,
} from '../pages/quality/models/qualityData';
import { AuthService } from './auth.service';
import { profitData } from '../pages/charts/models/profitByClient';

@Injectable({
  providedIn: 'root',
})
export class FireBirdService {
  protected destroy$: Subject<void> = new Subject<void>();
  private readonly API = 'http://localhost:3000/';

  token!: string | null;
  header!: HttpHeaders;

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    this.getToken();
  }

  getToken() {
    this.auth.idToken$.pipe(takeUntil(this.destroy$)).subscribe((result) => {
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
    console.log(this.header);

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
      .pipe(first());
  }

  findQualityById(ID_CLI: number, S_QUA: number) {
    return this.httpClient.get<[]>(
      `${this.API}quality/quality/${ID_CLI}/${S_QUA}`,
      { headers: this.header }
    );
  }

  qualitySelect(
    id: number,
    startDate: unknown,
    endDate: unknown,
    hideResolved: boolean
  ) {
    return this.httpClient.post<[]>(
      `${this.API}quality/select/PCP_OP_QUA`,
      {
        ID_CLI: id,
        startdate: startDate,
        enddate: endDate,
        hideResolved: hideResolved,
      },
      { headers: this.header }
    );
  }

  getActionQuality(id: number, squa: number) {
    return this.httpClient.get<[]>(
      `${this.API}quality/qualityAction/${id}/${squa}`,
      { headers: this.header }
    );
  }

  getChartData(startDate: string, endDate: string): Observable<profitData[]> {
    return this.httpClient
      .post<profitData[]>(
        `${this.API}charts/profitByClient`,
        {
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: this.header,
        }
      )
      .pipe(first());
  }

  updateQuality(data: FormGroup) {
    return this.httpClient.post<qualityTableData>(
      `${this.API}quality/updateQuality`,
      data,
      { headers: this.header }
    );
  }

  updateInsertAction(data: FormGroup) {
    return this.httpClient.post<[]>(`${this.API}quality/upOrInAction`, data, {
      headers: this.header,
    });
  }

  deleteAction(data: actionsData) {
    return this.httpClient.post<[]>(`${this.API}quality/deleteAction`, data, {
      headers: this.header,
    });
  }

  delete(deleteData: deleteData) {
    return this.httpClient.post<[]>(
      `${this.API}quality/deleteQuality/`,
      deleteData,
      { headers: this.header }
    );
  }
}
