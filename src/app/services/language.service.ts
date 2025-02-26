import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  translate = inject(TranslateService)

  constructor() { }


  setInitialLanguage(){
    let language = this.translate.getBrowserLang() as string;
    let savedLang = localStorage.getItem('language');

    this.translate.setDefaultLang(language)

    if(savedLang){
      this.setLanguage(savedLang)
    } else{
      this.setLanguage(language)
    }
  }



  setLanguage(lang: string){
    this.translate.use(lang);
    localStorage.setItem('language', lang)
  }

}
