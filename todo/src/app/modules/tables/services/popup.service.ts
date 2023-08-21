import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popupState = {
    multi: false,
    isOpen: false,
  };
  public popupState$ = new BehaviorSubject(this.popupState);

  public togglePopup(multi = false): void {
    this.popupState = {
      multi,
      isOpen: !this.popupState.isOpen,
    };
    this.popupState$.next(this.popupState);
  }
}
