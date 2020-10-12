import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { OptionItem } from '../../models/option-item.model';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  // Array of selectable options.
  @Input() data: OptionItem[];
  //Default value for selector.
  @Input() value: string = null;
  // Additional configuration.
  @Input() config = {};
  // Search placeholder.
  @Input() placeholder = '';
  // If the component is disabled or not.
  @Input() disabled = false;
  // Outputs the selected values.
  @Output() select = new EventEmitter<OptionItem>();

  // The options in the native format of the select2.
  nativeOptions: Select2OptionData[];

  private _configDefaults = {    
    width: '400px'
  };

  constructor() { }

  ngOnInit(): void {
    this.config = { ...this._configDefaults, ...this.config };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.nativeOptions = this._convertOptionsToNative(this.data);
    }
  }

  /** 
   * Callback for select changes, that will be projected outside the component
   * with the "select" event.
  */
  onChanged(id: string) {
    const selected: OptionItem = this.data.find(item => item.id === id);
    this.select.emit(selected);
  }

  /** 
   * Converts the options received by the component into options that are understood by the native select2.
   * This is done so app-selector can have its own interface, independent of the implementation.
  */
  private _convertOptionsToNative(options: OptionItem[]): Select2OptionData[] {
    return options.map(item => ({ id: item.id, text: item.name } as Select2OptionData ));
  }
}