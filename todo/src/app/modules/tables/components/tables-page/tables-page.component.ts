import { Component, OnInit } from '@angular/core';
import * as CompaniesJson from '../../mock-data.json';
import { TablecellInterface } from '../../models/tablecell.model';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss'],
})
export class TablesPageComponent implements OnInit {
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
  private columnsListFull = [
    'position',
    'name',
    'location',
    'sales',
    'profit',
    'assets',
    'mv',
  ];

  public displayedColumns = this.columnsListFull;
  public collapsedColumns: { [key: string]: boolean } = {
    sales: false,
    profit: false,
    assets: window.innerWidth < 576 ? true : false,
    mv: window.innerWidth < 576 ? true : false,
  };

  public ngOnInit(): void {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 576) {
        if (!Object.values(this.collapsedColumns).includes(true)) {
          this.collapsedColumns['assets'] = true;
          this.collapsedColumns['mv'] = true;
        }
      } else {
        this.collapsedColumns['sales'] = false;
        this.collapsedColumns['profit'] = false;
        this.collapsedColumns['assets'] = false;
        this.collapsedColumns['mv'] = false;
      }
    });
  }

  public convertStringValues(val: string): number {
    return parseFloat(val.replace('$', '').replace('B', '').replace(',', ''));
  }

  private collapseColumn(currentKey: string): void {
    const numOfColumnsCurrentlyShown = Object.values(
      this.collapsedColumns
    ).filter(val => val === false).length;

    if (numOfColumnsCurrentlyShown > 2) {
      const keysArr = Object.keys(this.collapsedColumns);
      console.log(keysArr);
      const expandedColumnIndex = keysArr.findIndex(val => val === currentKey);
      console.log(expandedColumnIndex);
      const columnToCollapse =
        expandedColumnIndex + 1 > Math.floor(keysArr.length / 2)
          ? keysArr
              .slice(0, Math.floor(keysArr.length / 2))
              .find(val => this.collapsedColumns[val] === false)
          : keysArr
              .slice(Math.floor(keysArr.length / 2))
              .find(val => this.collapsedColumns[val] === false);
      console.log(columnToCollapse);
      this.collapsedColumns[columnToCollapse || ''] = true;
    }
  }

  public changeColumns(event: Event): void {
    const elem = event.target as HTMLElement;

    for (const key in this.collapsedColumns) {
      if (elem.classList.contains(key)) {
        this.collapsedColumns[key] = false;
        this.collapseColumn(key);
      }
    }
  }
}
