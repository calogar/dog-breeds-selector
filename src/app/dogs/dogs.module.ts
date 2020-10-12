import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogsPageComponent } from './dogs-page/dogs-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DogsListComponent } from './dogs-list/dogs-list.component';

const routes: Routes = [
  { path: '', component: DogsPageComponent }
];

@NgModule({
  declarations: [DogsPageComponent, DogsListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ]
})
export class DogsModule { }
