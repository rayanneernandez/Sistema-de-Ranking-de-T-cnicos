export interface Technician {
  id: string;
  name: string;
  totalCalls: number;
  avgServiceTime: number; // in minutes
  firstResponseTime: number; // in minutes
  rating: number; // out of 5
  createdAt: string;
  updatedAt: string;
}

export type SortMetric = 'totalCalls' | 'avgServiceTime' | 'firstResponseTime' | 'rating';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface AppState {
  technicians: Technician[];
  dateRange: DateRange | null;
  sortBy: SortMetric;
  searchQuery: string;
}