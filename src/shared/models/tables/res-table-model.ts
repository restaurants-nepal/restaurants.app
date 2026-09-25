import type { TableStatus } from "./table-status-model";

export interface ResTableModel {
  id: number;
  restaurant_id: number;
  display_name: string;
  seating_capacity: number;
  status: TableStatus;
}
