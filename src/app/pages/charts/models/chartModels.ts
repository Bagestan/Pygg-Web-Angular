export interface ProfitData {
  CLIENTNAME: string;
  BILLINGVALUE: number;
  BILLINGQUANTITY: number;
  PROFITVALUE: number;
  FIRSTNAME: string;
  D_DOC: string;
  DATE: Date;
}

export interface ChartFilter {
  startDate: string;
  endDate: string;
  maxChartItems: number;
  chartType: ChartType['chartType'];
}

export interface ChartDataType {
  chartType: ChartType['chartType'];
  label: string[];
  abbreviatedLabel: string[];
  datasets: Datasets[];
}

export interface Datasets {
  data: number[];
  label: string;
  backgroundColor?: string;
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
