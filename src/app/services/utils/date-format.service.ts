import { Injectable } from '@angular/core';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  public toServerFormat(date: Date) {
    const dQUA = new Date(date);
    const day = String(dQUA.getDate()).padStart(2, '0');
    const month = String(dQUA.getMonth() + 1).padStart(2, '0');
    const year = dQUA.getFullYear();
    return `${day}.${month}.${year}`;
  }

  public formatJSDate(date: Date) {
    return format(date, 'dd-MM-yyyy');
  }

  public toSlashFormat(date: string) {
    const dQUA = new Date(date);
    const day = String(dQUA.getDate()).padStart(2, '0');
    const month = String(dQUA.getMonth() + 1).padStart(2, '0');
    const year = dQUA.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
