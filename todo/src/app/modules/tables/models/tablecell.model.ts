export interface TablecellInterface {
  '#': number;
  'Company name': string;
  Location: string;
  Sales: number;
  Profit: number;
  Assets: number;
  MV?: number;
  flags: TableFlagIntefrace[];
  start?: Date;
  end?: Date;
}

export interface TableFlagIntefrace {
  name: string;
  checked: boolean;
}
