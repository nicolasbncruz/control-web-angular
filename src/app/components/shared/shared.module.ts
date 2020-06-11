import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmptyTextPipe} from './pipes/empty-text.pipe';
import {MAT_DATE_LOCALE} from '@angular/material';
import {FormatHourDirective} from './directive/format-hour.directive';
import {OnlyNumberDirective} from './directive/only-number.directive';
import {PreventArrowsKeys} from './directive/prevent-arrows-keys';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EmptyTextPipe,
    FormatHourDirective,
    OnlyNumberDirective,
    PreventArrowsKeys
  ],
  exports: [
    EmptyTextPipe,
    FormatHourDirective,
    OnlyNumberDirective,
    PreventArrowsKeys
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]
})
export class SharedModule {
}
