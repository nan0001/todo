import { Component, Input, OnInit } from '@angular/core';
import { TablecellInterface } from '../../models/tablecell.model';
import { FormBuilder, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service';
import { CHECKBOX_COLORS } from '../../constants/checkbox-colors.constant';
import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss'],
})
export class EditPopupComponent implements OnInit {
  @Input() item: TablecellInterface | null = null;
  @Input() itemArrayLength = 0;

  public checkboxColors = CHECKBOX_COLORS;

  public editForm = this.fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    sales: [0, Validators.required],
    profit: [0, Validators.required],
    assets: [0, Validators.required],
    flags: this.fb.group({
      '1': [false],
      '2': [false],
      '3': [false],
    }),
  });

  constructor(
    private fb: FormBuilder,
    private popupService: PopupService,
    private dataSourceService: DataSourceService
  ) {}

  public ngOnInit(): void {
    if (this.item) {
      this.editForm.controls.name.setValue(this.item['Company name']);
      this.editForm.controls.location.setValue(this.item.Location);
      this.editForm.controls.sales.setValue(this.item.Sales);
      this.editForm.controls.profit.setValue(this.item.Profit);
      this.editForm.controls.assets.setValue(this.item.Assets);
      this.editForm.controls.flags.controls['1'].setValue(
        this.item.flags[0].checked
      );
      this.editForm.controls.flags.controls['2'].setValue(
        this.item.flags[1].checked
      );
      this.editForm.controls.flags.controls['3'].setValue(
        this.item.flags[2].checked
      );
    }
  }

  public closePopup(): void {
    this.popupService.togglePopup();
  }

  public onFormSubmit(): void {
    if (this.editForm.valid) {
      if (this.item) {
        const updatedItem = this.getUpdatedItem(this.item);
        this.dataSourceService.updateItem(updatedItem);
        this.popupService.togglePopup();
      } else {
        const newItem = this.getUpdatedItem();
        this.dataSourceService.updateItem(newItem);
        this.popupService.togglePopup();
      }
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  private getUpdatedItem(
    oldItem: TablecellInterface | null = null
  ): TablecellInterface {
    const newName = this.editForm.controls.name.value;
    const newLocation = this.editForm.controls.location.value;
    const newSales = this.editForm.controls.sales.value;
    const newProfit = this.editForm.controls.profit.value;
    const newAssets = this.editForm.controls.assets.value;
    const flag1 = this.editForm.controls.flags.controls[1].value;
    const flag2 = this.editForm.controls.flags.controls[2].value;
    const flag3 = this.editForm.controls.flags.controls[3].value;

    const updatedItem: TablecellInterface = {
      '#': oldItem?.['#'] || this.itemArrayLength + 1,
      'Company name': newName ? newName : oldItem?.['Company name'] || '',
      Location: newLocation ? newLocation : oldItem?.Location || '',
      Sales: newSales ? newSales : oldItem?.Sales || 0,
      Profit: newProfit ? newProfit : oldItem?.Profit || 0,
      Assets: newAssets ? newAssets : oldItem?.Assets || 0,
      flags: [
        {
          name: '1',
          checked: flag1 !== null ? flag1 : oldItem?.flags[0].checked || false,
        },
        {
          name: '2',
          checked: flag2 !== null ? flag2 : oldItem?.flags[1].checked || false,
        },
        {
          name: '3',
          checked: flag3 !== null ? flag3 : oldItem?.flags[2].checked || false,
        },
      ],
    };

    return updatedItem;
  }
}
