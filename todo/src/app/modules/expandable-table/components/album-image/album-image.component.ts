import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-album-image',
  templateUrl: './album-image.component.html',
  styleUrls: ['./album-image.component.scss'],
})
export class AlbumImageComponent {
  @Input() src = '';
}
