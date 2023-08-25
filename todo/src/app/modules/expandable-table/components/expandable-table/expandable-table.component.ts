import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrls: ['./expandable-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableTableComponent {
  public data$ = this.dataService.getData();

  constructor(private dataService: DataService) {}
}
