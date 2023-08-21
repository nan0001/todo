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
        start: new Date(val.start),
        end: new Date(val.end),
      };
    }
  );
  public tableDataSrc$ = new BehaviorSubject<TablecellInterface[]>(
    this.tableData
  );

  public updateItem(updatedItem: TablecellInterface): void {
    this.tableData = this.updateTableData(updatedItem);

    this.tableDataSrc$.next(this.tableData);
  }

  public updateMultipleItems(itemsArr: TablecellInterface[]): void {
    itemsArr.forEach(val => {
      this.tableData = this.updateTableData(val);
    });

    this.tableDataSrc$.next(this.tableData);
  }

  private convertStringValues(val: string): number {
    return parseFloat(val.replace('$', '').replace('B', '').replace(',', ''));
  }

  private updateTableData(
    updatedItem: TablecellInterface
  ): TablecellInterface[] {
    const newTableData = [...this.tableData];
    const itemIndex = newTableData.findIndex(
      val => val['#'] === updatedItem['#']
    );

    if (itemIndex !== -1) {
      newTableData[itemIndex] = {
        ...updatedItem,
        flags: [...updatedItem.flags],
      };
    } else {
      newTableData.push(updatedItem);
    }

    return newTableData;
  }
}
