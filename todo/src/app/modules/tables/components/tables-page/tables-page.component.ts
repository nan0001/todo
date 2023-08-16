import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  TableFlagIntefrace,
  TablecellInterface,
} from '../../models/tablecell.model';
import { PopupService } from '../../services/popup.service';
import { DataSourceService } from '../../services/data-source.service';
import { CHECKBOX_COLORS } from '../../constants/checkbox-colors.constant';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss'],
})
export class TablesPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns = [
    'checkbox',
    'position',
    'name',
    'location',
    'sales',
    'profit',
    'assets',
    'flags',
    'edit',
  ];
  public collapsedColumns: { [key: string]: boolean } = {
    sales: false,
    profit: false,
    assets: window.innerWidth < 576 ? true : false,
    flags: window.innerWidth < 576 ? true : false,
  };
  public checkboxColors = CHECKBOX_COLORS;
  public isPopupOpened = false;
  public isMultipleEditOpened = false;
  public itemToEdit: TablecellInterface[] = [];
  public dataSource = new MatTableDataSource<TablecellInterface>();
  public checkedItems: TablecellInterface[] = [];
  public allChecked = false;

  private subscription!: Subscription;
  private popupSubscription!: Subscription;

  constructor(
    private popupService: PopupService,
    private dataSourceService: DataSourceService
  ) {}

  public ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (elem, columnName) => {
      return this.getValueForSorting(elem, columnName);
    };
    this.subscription = this.dataSourceService.tableDataSrc$.subscribe(val => {
      this.dataSource.data = val;
      this.dataSource.data.forEach(item => {
        if (this.isElemInChecked(item)) {
          this.updateCheckedItem(item);
        }
      });
    });
    this.popupSubscription = this.popupService.popupState$.subscribe(val => {
      this.isPopupOpened = val.multi ? false : val.isOpen;
      this.isMultipleEditOpened = val.multi && val.isOpen;
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.popupSubscription.unsubscribe();
  }

  public toggleEditPopup(
    item: TablecellInterface | null = null,
    multi = false
  ): void {
    this.popupService.togglePopup(multi);
    this.itemToEdit = item ? [item] : [];
  }

  public toggleMultiEditPopup(): void {
    this.popupService.togglePopup();
  }

  public updateItemFlag(
    item: TablecellInterface,
    flagIndex: number,
    flag: TableFlagIntefrace
  ): void {
    const itemFlags = [...item.flags];
    itemFlags.splice(flagIndex, 1, { ...flag, checked: !flag.checked });
    const newItem: TablecellInterface = { ...item, flags: itemFlags };
    this.dataSourceService.updateItem({ ...newItem });
  }

  public checkItem(item: TablecellInterface): void {
    const itemIndex = this.checkedItems.findIndex(val => val === item);

    if (itemIndex !== -1) {
      this.checkedItems.splice(itemIndex, 1);
    } else {
      this.checkedItems.push(item);
    }

    this.allChecked = this.checkedItems.length === this.dataSource.data.length;
  }

  public setAllChecked(checked: boolean) {
    this.allChecked = checked;
    if (checked) {
      this.checkedItems = [...this.dataSource.data];
    } else {
      this.checkedItems = [];
    }
  }

  public isElemInChecked(elem: TablecellInterface): boolean {
    return this.checkedItems.findIndex(val => val['#'] === elem['#']) !== -1;
  }

  private updateCheckedItem(item: TablecellInterface): void {
    const itemIndex = this.checkedItems.findIndex(
      val => val['#'] === item['#']
    );

    if (itemIndex !== -1 && item !== this.checkedItems[itemIndex]) {
      this.checkedItems.splice(itemIndex, 1, item);
    }
  }

  private getValueForSorting(
    elem: TablecellInterface,
    columnName: string
  ): string | number {
    switch (columnName) {
      case 'position':
        return elem['#'];
      case 'name':
        return elem['Company name'];
      case 'location':
        return elem.Location;
      case 'sales':
        return elem.Sales;
      case 'profit':
        return elem.Profit;
      case 'assets':
        return elem.Assets;
      case 'flags':
        return elem.flags.reduce((acc, val) => (acc += Number(val.checked)), 0);
      default:
        return '';
    }
  }
}
