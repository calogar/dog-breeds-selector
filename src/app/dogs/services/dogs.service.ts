import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BreedsResponse } from '../models/breeds-response.model';
import { environment } from 'src/environments/environment';
import { map } from'rxjs/operators';
import { BreedImagesResponse } from '../models/breed-images-response.model';

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  private _baseUrl = environment.dogsBaseUrl

  constructor (
    private http: HttpClient
  ) { }

  /** 
   * Gets all the available dog breeds.
   * As the API doesn't seem to have pagination or querying, all the data is retrieved at once.
  */
  getAllBreeds(): Observable<string[]> {
    return this.http.get<BreedsResponse>(`${this._baseUrl}/breeds/list/all`).pipe(map(
      response => Object.keys(response.message)
    ));
  }

  /** 
   * Gets all available dog images for a specific breed.
  */
 getImagesByBreed(breed: string): Observable<string[]> {
   return this.http.get<BreedImagesResponse>(`${this._baseUrl}/breed/${breed}/images`).pipe(map(
      response => response.message
   ));
 }
}
