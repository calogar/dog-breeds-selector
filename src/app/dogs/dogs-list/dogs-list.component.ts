import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DogsService } from '../services/dogs.service';
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.scss']
})
export class DogsListComponent implements OnInit {

  // The selected dog breed. When it changes, new data is requested.
  @Input() breed: string;

  // List of URL images of dogs from the selected breed.
  dogImages: string[];

  constructor (
    private _dogsService: DogsService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.breed && this.breed) {
      this._dogsService.getImagesByBreed(this.breed).subscribe(images => {
        this.dogImages = images;
      });
    }
  }

}
