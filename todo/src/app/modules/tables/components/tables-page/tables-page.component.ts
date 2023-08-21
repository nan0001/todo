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
import { CompareType, FiltersInterface } from '../../models/filters.model';
import { FormBuilder } from '@angular/forms';

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
    'start',
    'end',
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
  public filtersForm = this.fb.group({
    search: null as string | null,
    salesCompare: 'less' as 'less' | 'more',
    sales: null as number | null,
    profitCompare: 'less' as 'less' | 'more',
    profit: null as number | null,
    assetsCompare: 'less' as 'less' | 'more',
    assets: null as number | null,
    date: this.fb.group({
      start: null as Date | null,
      end: null as Date | null,
    }),
    flags: null as string[] | null,
  });
  public areFiltersOpen = false;

  private subscription!: Subscription;
  private popupSubscription!: Subscription;

  constructor(
    private popupService: PopupService,
    private dataSourceService: DataSourceService,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (elem, columnName) => {
      return this.getValueForSorting(elem, columnName);
    };
    this.dataSource.filterPredicate = (elem, filterString) => {
      return this.filteringFunction(elem, filterString);
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

  public onFiltersChange(): void {
    const filterString = JSON.stringify(this.filtersForm.getRawValue());
    this.dataSource.filter = filterString;
  }

  public resetFilters(): void {
    this.filtersForm.reset({
      assetsCompare: 'less',
      profitCompare: 'less',
      salesCompare: 'less',
    });
    const filterString = JSON.stringify(this.filtersForm.getRawValue());
    this.dataSource.filter = filterString;
  }

  public toggleFilters(): void {
    this.areFiltersOpen = !this.areFiltersOpen;
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
      case 'start':
        return elem.start?.valueOf() || 0;
      case 'end':
        return elem.end?.valueOf() || 0;
      case 'flags':
        return elem.flags.reduce((acc, val) => (acc += Number(val.checked)), 0);
      default:
        return '';
    }
  }

  private filteringFunction(
    elem: TablecellInterface,
    filterString: string
  ): boolean {
    const filterObject = this.getFilterObject(filterString);
    let match = true;

    for (const prop in filterObject) {
      switch (prop) {
        case 'search': {
          match = match && this.filterStringValues(filterObject.search, elem);
          break;
        }
        case 'sales' || 'profit' || 'assets': {
          match =
            match &&
            this.filterNumericValues(
              filterObject[prop],
              filterObject[
                (prop + 'Compare') as keyof FiltersInterface
              ] as CompareType,
              prop[0].toUpperCase() + prop.slice(1),
              elem
            );
          break;
        }
        case 'flags': {
          match = match && this.filterFlags(filterObject.flags, elem);
          break;
        }
        case 'date': {
          match =
            match &&
            this.filterDate(
              filterObject.date.start,
              filterObject.date.end,
              elem
            );
          break;
        }
      }
    }

    return match;
  }

  private getFilterObject(filterString: string): FiltersInterface {
    const filterObject: FiltersInterface = JSON.parse(
      filterString,
      (key, val) => {
        if (key === 'start' || key === 'end') {
          return val === null ? null : new Date(val); //convert days string values into Date objects
        }

        return val;
      }
    );

    return filterObject;
  }

  private filterStringValues(
    searchString: string | null,
    elem: TablecellInterface
  ): boolean {
    if (searchString) {
      const isValueInName = elem['Company name']
        .toLowerCase()
        .includes(searchString.toLowerCase());
      const isValueInLocation = elem.Location.toLowerCase().includes(
        searchString.toLowerCase()
      );

      return isValueInName || isValueInLocation;
    }
    return true;
  }

  private filterNumericValues(
    searchValue: number | null,
    compareParam: CompareType,
    paramName: string,
    elem: TablecellInterface
  ): boolean {
    if (searchValue) {
      const elemValue = elem[paramName as keyof TablecellInterface];

      if (typeof elemValue === 'number') {
        return compareParam === 'more'
          ? elemValue >= searchValue
          : elemValue <= searchValue;
      }

      return false;
    }

    return true;
  }

  private filterFlags(
    flags: string[] | null,
    elem: TablecellInterface
  ): boolean {
    if (flags && flags.length > 0) {
      const flagsMatch = flags.reduce((acc, flag) => {
        const elemFlag = elem.flags.find(val => val.name === flag);
        return acc && (elemFlag ? elemFlag.checked : true);
      }, true);

      return flagsMatch;
    }
    return true;
  }

  private filterDate(
    start: Date | null,
    end: Date | null,
    elem: TablecellInterface
  ): boolean {
    if (start && end) {
      return (
        (elem.start ? elem.start < end : false) &&
        (elem.end ? elem.end > start : false)
      );
    }

    if (start && !end) {
      return elem.end ? elem.end > start : false;
    }

    if (!start && end) {
      return elem.start ? elem.start < end : false;
    }

    return true;
  }
}
