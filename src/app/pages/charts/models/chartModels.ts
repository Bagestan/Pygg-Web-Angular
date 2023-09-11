export interface ProfitData {
  CLIENTNAME: string;
  BILLINGVALUE?: number;
  BILLINGQUANTITY?: number;
  PROFITVALUE?: number;
  FIRSTNAME: string;
  D_DOC?: string;
  DATE: Date;
}

// export interface ProfitChartData {
//   name: string;
//   firstname: string;
//   date: Date;
//   dataSeries: [any];
//   serieName?: string;
//   serieValue?: number;
// }

// export interface dataSerie {}
// profit?: number;
// billingValue?: number;
// billingQuantity?: number;

export interface ChartFilter {
  startDate: string;
  endDate: string;
  maxChartItems: number;
  chartType: ChartType['chartType'];
  chartData: string;
  chartFields: string[];
}

export interface ChartType {
  chartType:
    | 'bar'
    | 'stackedBar'
    | 'doughnut'
    | 'fullStackedBar'
    | 'individualDoughnut'
    | 'pivotGrid';
}
