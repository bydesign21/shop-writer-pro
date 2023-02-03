import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

export class FileValueAccessor implements ControlValueAccessor {
  private fileListResponses: any[] = [];

  writeValue(obj: any): void {
    this.fileListResponses = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onChange(value: any) { }
  private onTouched() { }
}

export const FILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileValueAccessor),
  multi: true
};
