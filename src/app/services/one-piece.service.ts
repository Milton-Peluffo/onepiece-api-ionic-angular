import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnePieceService {

  http = inject(HttpClient);
  baseUrl: string = 'https://one-piece-episodes.p.rapidapi.com/one_piece';

  constructor() { }

  getSeasons(){
    return this.http.get( this.baseUrl + '/seasons', {
      headers: {
		'x-rapidapi-key': '4580ccc822msh995ee362f251647p1c8c95jsnb831751ec9e9',
		'x-rapidapi-host': 'one-piece-episodes.p.rapidapi.com'
      },
      params: {language: 'es'},
    })

  }

  getEpisodesBySeasons(id: string){
    return this.http.get( this.baseUrl + '/episodes_by_season/' +id, {
      headers: {
		'x-rapidapi-key': '4580ccc822msh995ee362f251647p1c8c95jsnb831751ec9e9',
		'x-rapidapi-host': 'one-piece-episodes.p.rapidapi.com'
      },
      params: {language: 'es'},
    })

  }

  getEpisodesByNumber(number: string){
    return this.http.get( this.baseUrl + '/episode/' +number, {
      headers: {
		'x-rapidapi-key': '4580ccc822msh995ee362f251647p1c8c95jsnb831751ec9e9',
		'x-rapidapi-host': 'one-piece-episodes.p.rapidapi.com'
      },
      params: {language: 'es'},
    })

  }

}
