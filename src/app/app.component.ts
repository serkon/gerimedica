import { Component } from '@angular/core';
import { Themizer } from 'src/app/utils/theme/themizer';

import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Starter';
  public param = { value: 'This project is Angular Pure Starter' };
  // @HostBinding('class') public hostClass = 'm-4 p-4';
  isExpanded = false;

  constructor(public languageService: LanguageService) {
    // console.log('AppComponent constructor', Theme);
    // console.log('AppComponent constructor', this.themeService);,
    new Themizer().attach();
  }
}
