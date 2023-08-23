export interface ProfitData {
  clientName: string;
  billingValue: number;
  billingQuantity: number;
  profitValue: number;
}

export interface ChartFilter {
  startDate: string;
  endDate: string;
  maxChartItems: number;
  chartType: 'bars' | 'stackedBars' | 'doughnut';
}

export interface ChartDataType {
  chartType: 'bars' | 'stackedBars' | 'doughnut';
  label: string[];
  abbreviatedLabel: string[];
  datasets: Datasets[];
}

export interface Datasets {
  data: number[];
  label: string;
  backgroundColor?: string;
}
