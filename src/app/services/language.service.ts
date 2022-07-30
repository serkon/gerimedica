import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public languages = ['en', 'tr'];
  public currentLanguage: string;

  constructor(public translate: TranslateService) {
    this.currentLanguage = 'tr';
    this.setDefaultLanguage(this.currentLanguage);
    this.setLanguage(this.currentLanguage);
  }

  /**
   * This language will be used as a fallback when a translation isn't found in the current language
   * @param lang en | tr
   */
  setDefaultLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
  }

  /**
   * The lang to use, if the lang isn't available, it will use the current loader to get them
   * @param lang en | tr
   */
  setLanguage(lang: string = this.currentLanguage): void {
    this.translate.use(lang);
  }

  /**
   * When changed the language, it will be triggered
   * @param callback function
   */
  listener(callback: (lang: any) => any): void {
    this.translate.onLangChange.subscribe((lang) => {
      callback(lang);
    });
  }

  /**
   * Language listener unsubscriber
   */
  unsubscribe(): void {
    this.translate.onLangChange.unsubscribe();
  }
}
