export interface IQueryModel {
  sort?: string;
  select?: string;
  page?: number;
  limit?: number;

  sortBy?: string;
  sortDir?: number;
  search?: string;
}