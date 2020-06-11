import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPreventArrows]'
})

export class PreventArrowsKeys {
  private specialKeys: Array<string> = ['ArrowRight', 'ArrowLeft'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.specialKeys.indexOf(event.key) == 1) {
      event.preventDefault();
    }
  }

}
