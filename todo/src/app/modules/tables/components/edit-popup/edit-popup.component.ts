import { Component, Input, OnInit } from '@angular/core';
import { TablecellInterface } from '../../models/tablecell.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service';
import { CHECKBOX_COLORS } from '../../constants/checkbox-colors.constant';
import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss'],
})
export class EditPopupComponent implements OnInit {
  @Input() items: TablecellInterface[] = [];
  @Input() itemArrayLength = 0;
  @Input() multi = false;

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
    this.initializeForm();
  }

  public closePopup(): void {
    this.popupService.togglePopup();
  }

  public onFormSubmit(): void {
    if (this.editForm.valid) {
      if (this.items.length < 2) {
        const newItem = this.getUpdatedItem(this.items[0]);
        this.dataSourceService.updateItem(newItem);
      } else {
        const newItemsArray: TablecellInterface[] = [];
        this.items.forEach(val => newItemsArray.push(this.getUpdatedItem(val)));
        this.dataSourceService.updateMultipleItems(newItemsArray);
      }

      this.closePopup();
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  public setIndeterminate(flagIndex: number): boolean {
    if (this.items.length > 1) {
      const trueIndex = this.items.findIndex(
        val => val.flags[flagIndex].checked === true
      );
      const falseIndex = this.items.findIndex(
        val => val.flags[flagIndex].checked === false
      );

      return trueIndex !== -1 && falseIndex !== -1;
    }

    return false;
  }

  private initializeForm(): void {
    if (this.items.length === 1) {
      this.editForm.controls.name.setValue(this.items[0]['Company name']);
      this.editForm.controls.location.setValue(this.items[0].Location);
      this.editForm.controls.sales.setValue(this.items[0].Sales);
      this.editForm.controls.profit.setValue(this.items[0].Profit);
      this.editForm.controls.assets.setValue(this.items[0].Assets);
      this.editForm.controls.flags.controls['1'].setValue(
        this.items[0].flags[0].checked
      );
      this.editForm.controls.flags.controls['2'].setValue(
        this.items[0].flags[1].checked
      );
      this.editForm.controls.flags.controls['3'].setValue(
        this.items[0].flags[2].checked
      );
    }

    if (this.items.length > 1) {
      this.editForm.controls.flags.controls['1'].setValue(
        this.setMultipleChecked(0)
      );
      this.editForm.controls.flags.controls['2'].setValue(
        this.setMultipleChecked(1)
      );
      this.editForm.controls.flags.controls['3'].setValue(
        this.setMultipleChecked(2)
      );
    }
  }

  private setMultipleChecked(flagIndex: number) {
    return this.items.reduce(
      (acc, current) => (acc = acc && current.flags[flagIndex].checked),
      true
    );
  }

  private getUpdatedItem(
    oldItem: TablecellInterface | undefined
  ): TablecellInterface {
    const newName = this.editForm.controls.name.value;
    const newLocation = this.editForm.controls.location.value;
    const newSales = this.editForm.controls.sales.value;
    const newProfit = this.editForm.controls.profit.value;
    const newAssets = this.editForm.controls.assets.value;
    const flag1 = this.editForm.controls.flags.controls[1];
    const flag2 = this.editForm.controls.flags.controls[2];
    const flag3 = this.editForm.controls.flags.controls[3];

    const updatedItem: TablecellInterface = {
      '#': oldItem?.['#'] || this.itemArrayLength + 1,
      'Company name':
        newName !== null ? newName : oldItem?.['Company name'] || '',
      Location: newLocation !== null ? newLocation : oldItem?.Location || '',
      Sales: newSales !== null ? newSales : oldItem?.Sales || 0,
      Profit: newProfit !== null ? newProfit : oldItem?.Profit || 0,
      Assets: newAssets !== null ? newAssets : oldItem?.Assets || 0,
      flags: [
        {
          name: '1',
          checked: this.getNewFlagValue(flag1, oldItem, 0),
        },
        {
          name: '2',
          checked: this.getNewFlagValue(flag2, oldItem, 1),
        },
        {
          name: '3',
          checked: this.getNewFlagValue(flag3, oldItem, 2),
        },
      ],
    };

    return updatedItem;
  }

  private getNewFlagValue(
    flag: FormControl<boolean | null>,
    oldItem: TablecellInterface | undefined,
    flagIndex: number
  ): boolean {
    return flag.value !== null && !(flag.value === false && flag.pristine)
      ? flag.value
      : oldItem?.flags[flagIndex].checked || false;
  }
}
