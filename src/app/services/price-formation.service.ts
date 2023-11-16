import { Injectable } from '@angular/core';
import { Customer, Product } from './shared/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, retry, takeUntil, tap, timeout } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PriceFormationService {
  protected destroy$: Subject<void> = new Subject<void>();
  private readonly API = 'http://localhost:3000/';

  product!: Product;
  customer!: Customer;
  productImg!: any;

  token!: string | null;
  header!: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private message: NzMessageService,
    private auth: AuthService
  ) {
    this.getToken();
  }

  getPriceTaxes(customerId: number) {
    return this.httpClient
      .post(
        `${this.API}price/getTaxes`,
        { customerId },
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

  getPriceMarkup() {
    return this.httpClient
      .post(`${this.API}price/getMarkupOptions`, {}, { headers: this.header })
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  getPaymentOption() {
    return this.httpClient
      .post(`${this.API}price/getPaymentOption`, {}, { headers: this.header })
      .pipe(
        retry(2),
        timeout(10000),
        tap({
          error: (error) => this.message.error(error),
        })
      );
  }

  getReferencePrice(reference: string, customerId: number) {
    return this.httpClient
      .post(
        `${this.API}price/getReference`,
        { reference, customerId: customerId },
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

  getReferenceImg(reference: string, customerId: number) {
    return this.httpClient
      .post(
        `${this.API}price/getReferenceImg`,
        { reference: reference, customerId: customerId },
        { headers: this.header, responseType: 'blob' }
      )
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
}
