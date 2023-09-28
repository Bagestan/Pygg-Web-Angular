export interface ProfitData {
  CLIENTNAME: string;
  BILLINGVALUE?: number;
  BILLINGQUANTITY?: number;
  PROFITVALUE?: number;
  FIRSTNAME: string;
  D_DOC?: string;
  DATE: Date;
}

export interface ChartFilter {
  startDate: string;
  endDate: string;
  maxChartItems: number;
  chartType: ChartType['chartType'];
  chartData: string;
  chartFields: string[];
}

export interface ChartType {
  chartType: 'bar' | 'stackedBar' | 'doughnut' | 'fullStackedBar';
}

export interface FieldsOptions {
  value: string;
  label: string;
  checked: boolean;
}

export interface dxChartType {
  argumentField: string;
  firstName: string;
  BillingValue: number;
  BillingQuantity: number;
  ProfitValue: number;
}
