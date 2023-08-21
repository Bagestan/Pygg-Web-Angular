export interface ProfitData {
  NOME_CLIENTE: string;
  VALOR_FATURAMENTO: number;
  QUANTIDADE_FATURAMENTO: number;
  LUCRO: number;
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
