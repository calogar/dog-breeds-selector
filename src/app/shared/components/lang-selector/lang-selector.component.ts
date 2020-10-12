import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent {

  constructor(public translate: TranslateService) {    
    translate.addLangs(environment.languages);
    translate.setDefaultLang(environment.defaultLang);
  }
}
