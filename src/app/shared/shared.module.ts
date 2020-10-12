import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './components/selector/selector.component'
import { NgSelect2Module } from 'ng-select2';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LangSelectorComponent } from './components/lang-selector/lang-selector.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    SelectorComponent,
    SpinnerComponent,
    LangSelectorComponent
  ],
  imports: [
    CommonModule,
    NgSelect2Module,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
  ],
  exports: [
    SelectorComponent,
    LangSelectorComponent,
    TranslateModule
  ],
  entryComponents: [
    SpinnerComponent
  ]
})
export class SharedModule { }
