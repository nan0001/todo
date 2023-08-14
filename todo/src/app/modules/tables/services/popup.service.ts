import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  public popupOpened$ = new BehaviorSubject(false);
  private popupOpened = false;

  public togglePopup(): void {
    this.popupOpened = !this.popupOpened;
    this.popupOpened$.next(this.popupOpened);
  }
}
