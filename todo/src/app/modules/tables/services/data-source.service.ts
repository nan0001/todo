import { Injectable } from '@angular/core';
import * as CompaniesJson from '../mock-data.json';
import { TablecellInterface } from '../models/tablecell.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  public tableData: TablecellInterface[] = Array.from(CompaniesJson).map(
    val => {
      return {
        ...val,
        Sales: this.convertStringValues(val.Sales),
        Profit: this.convertStringValues(val.Profit),
        Assets: this.convertStringValues(val.Assets),
        MV: this.convertStringValues(val.MV),
      };
    }
  );
  public tableDataSrc = new BehaviorSubject<TablecellInterface[]>(
    this.tableData
  );

  private convertStringValues(val: string): number {
    return parseFloat(val.replace('$', '').replace('B', '').replace(',', ''));
  }

  public updateItem(updatedItem: TablecellInterface): void {
    const itemIndex = this.tableData.findIndex(
      val => val['#'] === updatedItem['#']
    );
    this.tableData[itemIndex] = {
      ...updatedItem,
      flags: [...updatedItem.flags],
    };
    this.tableDataSrc.next(this.tableData);
  }
}
