import { Component, OnInit, OnDestroy } from '@angular/core';
import { TablecellInterface } from '../../models/tablecell.model';
import { PopupService } from '../../services/popup.service';
import { DataSourceService } from '../../services/data-source.service';
import { CHECKBOX_COLORS } from '../../constants/checkbox-colors.constant';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss'],
})
export class TablesPageComponent implements OnInit, OnDestroy {
  public displayedColumns = [
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
  public popupState = this.popupService.popupState;
  public itemToEdit: TablecellInterface | null = null;
  private subscription!: Subscription;
  public dataSource = new MatTableDataSource<TablecellInterface>();

  constructor(
    private popupService: PopupService,
    private dataSourceService: DataSourceService
  ) {}

  public ngOnInit(): void {
    this.subscription = this.dataSourceService.tableDataSrc.subscribe(val => {
      this.dataSource.data = val;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleEditPopup(item: TablecellInterface): void {
    this.popupService.togglePopup();
    this.itemToEdit = this.popupState.opened ? item : null;
  }

  public updateItem(item: TablecellInterface): void {
    this.dataSourceService.updateItem({ ...item });
  }
}
