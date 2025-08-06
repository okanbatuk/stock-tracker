export type User = { email: string; name?: string };

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  responseCode: string;
  message: string;
  data?: T;
  errors?: string[];
  timestamp: string;
}

export interface LoginResponse {
  accessToken: string;
  firstLogin: boolean;
  user: { email: string; name: string };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface UserUpdatePayload {
  name?: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface Stock {
  id: number;
  symbol: string;
  name: string;
}

export interface WatchedStock {
  id: number;
  symbol: string;
  name: string;
  price?: number;
  change?: number;
}

export interface ChartData {
  labels?: string[];
  datasets?: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
    pointRadius: number;
    pointHoverRadius: number;
  }>;
}

export interface Info {
  timeRange?: string;
  firstRecord?: string;
  lastRecord?: string;
  totalRecords?: number;
}

export interface StockChartProps {
  symbol: string;
  hours?: number;
}
