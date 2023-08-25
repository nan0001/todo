import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-album-name',
  templateUrl: './album-name.component.html',
  styleUrls: ['./album-name.component.scss'],
})
export class AlbumNameComponent {
  @Input() singer = '';
  @Input() album = '';
}
