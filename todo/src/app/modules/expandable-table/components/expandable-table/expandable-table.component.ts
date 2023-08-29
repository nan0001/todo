import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrls: ['./expandable-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableTableComponent {
  public data$ = this.dataService.getData();

  public inputsForm = this.formBuilder.group({
    value: ['1234'.split('')],
  });

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}
}
