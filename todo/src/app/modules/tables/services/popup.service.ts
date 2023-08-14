import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  public popupState = { opened: false };

  public togglePopup(): void {
    this.popupState.opened = !this.popupState.opened;
  }
}
