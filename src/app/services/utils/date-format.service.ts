import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  constructor(private datePipe: DatePipe) {}

  public formatDateBR(data: Date): string {
    return this.datePipe.transform(data, 'dd.MM.yyyy') || '';
  }

  public toServerFormat(date: Date) {
    const dQUA = new Date(date);
    const day = String(dQUA.getDate()).padStart(2, '0');
    const month = String(dQUA.getMonth() + 1).padStart(2, '0');
    const year = dQUA.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
