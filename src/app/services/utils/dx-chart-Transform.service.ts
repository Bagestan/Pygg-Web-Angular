import { Injectable } from '@angular/core';
import { dxChartType } from 'src/app/pages/charts/utils/chartModels';

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
        ProfitPercentage: object.PROFITPERCENTAGE,
      };
      return chartData;
    } else if (object.hasOwnProperty('BENEFNAME')) {
      const chartData: dxChartType = {
        argumentField: object.BENEFNAME,
        ProfitValue: object.PROFITVALUE,
        BillingQuantity: object.BILLINGQUANTITY,
        BillingValue: object.BILLINGVALUE,
        ProfitPercentage: object.PROFITPERCENTAGE,
      };
      return chartData;
    } else if (object.hasOwnProperty('UF')) {
      const chartData: dxChartType = {
        argumentField: (object.UF as string).slice(0, 2),
        ProfitValue: object.PROFITVALUE,
        BillingQuantity: object.BILLINGQUANTITY,
        BillingValue: object.BILLINGVALUE,
        ProfitPercentage: object.PROFITPERCENTAGE,
      };
      return chartData;
    } else if (object.hasOwnProperty('DS_RAMO')) {
      const chartData: dxChartType = {
        argumentField: object.DS_RAMO,
        ProfitValue: object.PROFITVALUE,
        BillingQuantity: object.BILLINGQUANTITY,
        BillingValue: object.BILLINGVALUE,
        ProfitPercentage: object.PROFITPERCENTAGE,
      };
      return chartData;
    } else {
      return null;
    }
  }
}
