import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component( {
  selector: 'icon-filter-text-box',
  template: '<p>Filter: <input type="text" name="filter" id="filter" [(ngModel)]="filter"></p>'
})
export class FilterTextBoxComponent implements OnInit {

  private _filter: string;
  @Input() get filter() {
    return this._filter;
  }

  set filter(val: string) {
    this._filter = val;
    this.onChanged.emit(this.filter); // raise the onchange event
  }

  @Output() onChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {

  }

}