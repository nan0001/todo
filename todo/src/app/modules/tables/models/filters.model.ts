export interface FiltersInterface {
  search: string | null;
  sales: number | null;
  salesCompare: CompareType;
  profitCompare: CompareType;
  assetsCompare: CompareType;
  profit: number | null;
  assets: number | null;
  flags: string[] | null;
  date: {
    start: Date | null;
    end: Date | null;
  };
}

export type CompareType = 'less' | 'more' | null;
