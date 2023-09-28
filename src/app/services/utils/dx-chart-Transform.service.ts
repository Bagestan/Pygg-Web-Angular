import { Injectable } from '@angular/core';
import { dxChartType } from 'src/app/pages/charts/models/chartModels';

@Injectable({
  providedIn: 'root',
})
export class DxChartTransformService {
  dxChartData!: dxChartType;

  DxTransform(chartData: any[]) {
    const chartDataTransformed: any[] = [];
    chartData.forEach((object: any) => {
      chartDataTransformed.push(this.transformObject(object));
    });

    return chartDataTransformed;
  }

  private transformObject(object: any): dxChartType | null {
    if (object.hasOwnProperty('CLIENTNAME')) {
      const chartData: dxChartType = {
        argumentField: object.CLIENTNAME,
        firstName: object.CLIENTNAME.split(' ')[0],
        ProfitValue: object.PROFITVALUE,
        BillingQuantity: object.BILLINGQUANTITY,
        BillingValue: object.BILLINGVALUE,
      };
      return chartData;
    } else if (object.hasOwnProperty('BENEFNAME')) {
      const chartData: dxChartType = {
        argumentField: object.BENEFNAME,
        firstName: object.BENEFNAME,
        ProfitValue: object.PROFITVALUE,
        BillingQuantity: object.BILLINGQUANTITY,
        BillingValue: object.BILLINGVALUE,
      };
      return chartData;
    } else {
      return null;
    }
  }
}
