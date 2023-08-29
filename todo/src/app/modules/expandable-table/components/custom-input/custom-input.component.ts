import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  private _value: string[] = ['', '', '', ''];

  private numString = '0123456789';

  get value(): string[] {
    return this._value;
  }

  @Input()
  set value(val: string[]) {
    this._value = val;
    this.onChange(this._value);
  }

  public onChange(val: string[]): void {
    return;
  }

  public onInput(event: Event): void {
    const inputEvent = event as InputEvent;
    const target = event.target as HTMLInputElement;

    if (inputEvent.data && !this.numString.includes(inputEvent.data)) {
      return;
    }

    if (inputEvent.inputType === 'insertText') {
      if (target.value.length > 1) {
        target.value = String(inputEvent.data);
      }

      this.shiftRight(target);
    }

    this.updateValue(target, inputEvent.data);
    this.onChange(this._value);
  }

  public onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    if (event.code === 'ArrowRight') {
      this.shiftRight(target);
    }

    if (event.code === 'ArrowLeft') {
      this.shiftLeft(target);
    }

    if (event.code === 'Backspace') {
      setTimeout(() => this.shiftLeft(target), 0);
    }
  }

  public onPaste(event: ClipboardEvent): void {
    const target = event.target as HTMLInputElement;
    const data = event.clipboardData ? event.clipboardData.getData('text') : '';
    const dataArr = data
      .slice(0, 4)
      .split('')
      .map(val => {
        return this.numString.includes(val) ? val : '';
      }); //parseInt doesn't suit for 0s

    this.value = dataArr;
    target.blur();
  }

  public onFocus(event: FocusEvent): void {
    const target = event.target as HTMLInputElement;
    const val = target.value;
    target.value = '';
    target.value = val;
  }

  public writeValue(newValue: string[]): void {
    this._value = newValue;
  }

  public registerOnChange(fn: (val: string[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    return;
  }

  private shiftRight(target: HTMLElement): void {
    const nextSibling = target.nextElementSibling;
    this.focusSibling(nextSibling);
  }

  private shiftLeft(target: HTMLElement): void {
    const prevSibling = target.previousElementSibling;
    this.focusSibling(prevSibling);
  }

  private focusSibling(sibling: Element | null): void {
    if (sibling) {
      (sibling as HTMLElement).focus();
    }
  }

  private updateValue(target: HTMLElement, data: string | null): void {
    const inputIndex = Number(target.id.split('-')[1]);
    const valueArr = [...this.value];
    valueArr.splice(inputIndex, 1, data || '');
    this.value = valueArr;
  }
}
