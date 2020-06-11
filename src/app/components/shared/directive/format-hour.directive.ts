import {Directive, ElementRef, HostListener, OnInit, Renderer2, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl, Validator} from '@angular/forms';

@Directive({
  selector: '[appFormatHourDirective]'
})

export class FormatHourDirective implements OnInit, ControlValueAccessor, Validator{

  private _dateValue: Date;
  private _fieldJustGotFocus = false;
  _onChange: (_: Date) => void;
  _touched: () => void;

  constructor(@Self() private _el: ElementRef,
              public ngControl: NgControl,
              private _renderer: Renderer2) {
  }

  ngOnInit() {
    this._el.nativeElement.style.fontFamily = 'monospace';
    this._el.nativeElement.style.cursor = 'default';
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event, backspace) {
    let newVal = event;

    newVal = newVal.replace(/\D/g, '');

    if (backspace && newVal.length <= 2) {
      newVal = newVal.substring(0, newVal.length - 1);
    }

    if (newVal.length > 0) {
      newVal = newVal.substring(0, 4);
      let regex: RegExp = new RegExp(/^(0?[0-9]|1[0-9]|2[0-4]|0[0-9][0-9]|1[0-9][0-9]|2[0-3][0-9]|[2][4][0]|[0-1][0-9][0-5][0-9]|[0-2][0-3][0-5][0-9]|[2][4][0][0])$/gm);

      if (!String(newVal).match(regex)) {
        newVal = '00000';
      }
    }

    if (newVal.length <= 4) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');
    } else {
      newVal = newVal.substring(0, 4);
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');
    }

    this.ngControl.valueAccessor.writeValue(newVal);
  }

  /*@HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {

    const keyCode = evt.keyCode;
    switch (keyCode) {
      case LEFT_ARROW:
      case RIGHT_ARROW:
      case TAB:
        this._decideWhetherToJumpAndSelect(keyCode, evt);
        break;

      case DELETE:
      case BACKSPACE:
        this._clearHoursOrMinutes();
        break;

      default:
        if ((keyCode >= ZERO && keyCode <= NINE) ||
          (keyCode >= NUMPAD_ZERO && keyCode <= NUMPAD_NINE)) {
          // trata números
          this._setInputText(evt.key);
        }
    }

    if (keyCode !== TAB) {
      evt.preventDefault();
    }
  }*/

  /*@HostListener('click', ['$event'])
  onClick(evt: MouseEvent) {
    this._fieldJustGotFocus = true;
    const caretPosition = this._doGetCaretPosition();
    if (caretPosition < 3) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
    }
  }*/

  /*@HostListener('focus', ['$event'])
  onFocus(evt: any) {
    this._fieldJustGotFocus = true;
    const caretPosition = this._doGetCaretPosition();
    if (caretPosition < 3) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(evt: any) {
    this._touched();
  }

  private _decideWhetherToJumpAndSelect(keyCode: number, evt?: KeyboardEvent) {

    const caretPosition = this._doGetCaretPosition();

    switch (keyCode) {
      case RIGHT_ARROW:
        this._el.nativeElement.setSelectionRange(3, 6);
        break;

      case LEFT_ARROW:
        this._el.nativeElement.setSelectionRange(0, 2);
        break;

      case TAB:
        if (caretPosition < 2 && !evt.shiftKey) {
          this._el.nativeElement.setSelectionRange(3, 6);
          evt.preventDefault();
        } else if (caretPosition > 2 && evt.shiftKey) {
          this._el.nativeElement.setSelectionRange(0, 2);
          evt.preventDefault();
        }
    }

    this._fieldJustGotFocus = true;
  }

  private _setInputText(key: string) {
    const input: string[] = this._el.nativeElement.value.split(':');

    const hours: string = input[0];
    const minutes: string = input[1];

    const caretPosition = this._doGetCaretPosition();
    if (caretPosition < 3) {
      this._setHours(hours, minutes, key);
    } else {
      this._setMinutes(hours, minutes, key);
    }

    this._fieldJustGotFocus = false;
  }

  private _setHours(hours: string, minutes: string, key) {
    const hoursArray: string[] = hours.split('');
    const firstDigit: string = hoursArray[0];
    const secondDigit: string = hoursArray[1];

    let newHour = '';

    let completeTime = '';
    let sendCaretToMinutes = false;

    if (firstDigit === '-' || this._fieldJustGotFocus) {
      newHour = `0${key}`;
      sendCaretToMinutes = Number(key) > 2;
    } else {
      newHour = `${secondDigit}${key}`;
      if (Number(newHour) > 23) {
        newHour = '23';
      }
      sendCaretToMinutes = true;
    }

    completeTime = `${newHour}:${minutes}`;

    this._renderer.setProperty(this._el.nativeElement, 'value', completeTime);
    this._controlValueChanged();
    if (!sendCaretToMinutes) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
      this._fieldJustGotFocus = true;
    }
  }

  private _setMinutes(hours: string, minutes: string, key) {
    const minutesArray: string[] = minutes.split('');
    const firstDigit: string = minutesArray[0];
    const secondDigit: string = minutesArray[1];

    let newMinutes = '';

    let completeTime = '';

    if (firstDigit === '-' || this._fieldJustGotFocus) {
      newMinutes = `0${key}`;
    } else {
      if (Number(minutes) === 59) {
        newMinutes = `0${key}`;
      } else {
        newMinutes = `${secondDigit}${key}`;
        if (Number(newMinutes) > 59) {
          newMinutes = '59';
        }
      }
    }

    completeTime = `${hours}:${newMinutes}`;

    this._renderer.setProperty(this._el.nativeElement, 'value', completeTime);
    this._controlValueChanged();
    this._el.nativeElement.setSelectionRange(3, 6);
  }

  _clearHoursOrMinutes() {
    const caretPosition = this._doGetCaretPosition();
    const input: string[] = this._el.nativeElement.value.split(':');

    const hours: string = input[0];
    const minutes: string = input[1];

    let newTime = '';
    let sendCaretToMinutes = false;

    if (caretPosition > 2) {
      newTime = `${hours}:--`;
      sendCaretToMinutes = true;
    } else {
      newTime = `--:${minutes}`;
      sendCaretToMinutes = false;
    }

    this._fieldJustGotFocus = true;

    this._renderer.setProperty(this._el.nativeElement, 'value', newTime);
    this._controlValueChanged();
    if (!sendCaretToMinutes) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
    }
  }

  writeValue(value: Date): void {
    if (value && !(value instanceof Date)) {
      throw new Error('A diretiva appTimeMask exige que o valor do componente seja do tipo Date');
    }

    this._dateValue = new Date(value);

    const v = value ? this._dateToStringTime(value) : '--:--';

    this._renderer.setProperty(this._el.nativeElement, 'value', v);
  }

  registerOnChange(fn: (_: Date) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._touched = fn;
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._el.nativeElement, 'disabled', isDisabled);
  }

  validate(c: FormControl): { [key: string]: any } {
    return this._el.nativeElement.value.indexOf('-') === -1 ? null : { validTime: false };
  }*/

  private _doGetCaretPosition(): number {
    let iCaretPos = 0;
    const nativeElement = this._el.nativeElement;
    // IE Support
    /*if (document.hasOwnProperty('selection')) {
      nativeElement.focus();
      // To get cursor position, get empty selection range
      const oSel = document['selection'].createRange();
      // Move selection start to 0 position
      oSel.moveStart('character', -nativeElement.value.length);
      // The caret position is selection length
      iCaretPos = oSel.text.length;
    } else if (nativeElement.selectionStart || nativeElement.selectionStart === '0') {
      // Firefox support
      iCaretPos = nativeElement.selectionStart;
    }*/
    // Return results
    return iCaretPos;

  }
/*
  private _zeroFill(value: number): string {
    return (value > 9 ? '' : '0') + value;
  }

  private _dateToStringTime(value: Date) {
    return this._zeroFill(value.getHours()) + ':' + this._zeroFill(value.getMinutes());
  }

  private _stringToNumber(str: string) {
    if (str.indexOf('-') === -1) {
      return Number(str);
    }

    const finalStr = str.replace('-', '0').replace('-', '0');

    return Number(finalStr);
  }

  private _controlValueChanged() {
    const timeArray: string[] = this._el.nativeElement.value.split(':');
    this._dateValue = new Date(this._dateValue.setHours(this._stringToNumber(timeArray[0])));
    this._dateValue = new Date(this._dateValue.setMinutes(this._stringToNumber(timeArray[1])));
    this._onChange(this._dateValue);
  }*/

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  validate(c: FormControl): { [key: string]: any } {
    return undefined;
  }

  writeValue(obj: any): void {
  }

}
