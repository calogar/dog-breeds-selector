import { Component, OnInit } from '@angular/core';
import { OptionItem } from 'src/app/shared/models/option-item.model';
import { DogsService } from '../services/dogs.service';

@Component({
  selector: 'app-dogs-page',
  templateUrl: './dogs-page.component.html',
  styleUrls: ['./dogs-page.component.scss']
})
export class DogsPageComponent implements OnInit {

  options: OptionItem[];
  selected: OptionItem;

  constructor (
    private _dogsService: DogsService
  ) { }

  ngOnInit(): void {
    this._dogsService.getAllBreeds().subscribe((options: string[]) => {
      // Convert from backend format to selector specific format.
      // As "id" is the same as "name" in this case, it could have been simplified.
      // But it was designed like this to allow more generic use cases.
      this.options = options.map(item => ( { id: item, name: item }));
    });
  }

  /**
   * Receives the selected item from the selector.
  */
  onSelect(item: OptionItem) {
    this.selected = item;
  }
}
