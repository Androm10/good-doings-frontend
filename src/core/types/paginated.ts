export interface Paginated<T> {
  result: T[];
  limit: number;
  count: number;
  page: number;
  pages: number;
}
