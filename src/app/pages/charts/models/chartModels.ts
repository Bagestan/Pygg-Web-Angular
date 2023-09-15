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
