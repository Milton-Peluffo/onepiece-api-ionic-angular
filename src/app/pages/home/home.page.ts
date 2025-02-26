import { Component, OnInit, inject } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { OnePieceService } from '../../services/one-piece.service';
import { ISeasson } from 'src/app/models/seasson.model';
import { IEpisodes } from 'src/app/models/episodes.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  selectedSeason = '';
  seasons: ISeasson[] = [];
  episodes: IEpisodes[] = [];
  episode_number = ''
  languageSvc = inject(LanguageService);
  onePiceService = inject(OnePieceService);
  selectedLanguage = '';

  loading: boolean = false;


  constructor() {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language') as string;
    this.getSeasons();
  }

  //cambiar idioma
  setLanguage() {
    this.languageSvc.setLanguage(this.selectedLanguage);
    this.getSeasons();
  }

  //obtener temporadas
  getSeasons(){
    this.loading = true;

    this.onePiceService.getSeasons().subscribe({
      next: (res:any) => {
        this.loading = false;
        console.log(res);
        this.seasons = res.seasons;
        this.selectedSeason = this.seasons[0].id;

        this.getEpisodesBySeason();
      },
      error: (err:any) =>{
        this.loading = false;
    
      }
     
    });
  }

 //obtener episodios por temporada
  getEpisodesBySeason(){
    this.loading = true;

    this.onePiceService.getEpisodesBySeasons(this.selectedSeason).subscribe({
      next: (res:any) => {
        this.loading = false;
        console.log(res);
        this.episodes = res.episodes;
      }
     
    });
  }

   //obtener episodios por numero
   getEpisodesByNumber(){
    this.loading = true;

    if(this.episode_number){
      this.onePiceService.getEpisodesByNumber(this.episode_number).subscribe({
        next: (res:any) => {
          this.loading = false;
          console.log(res);
          this.episodes= [res.episode]
        },
        error:(err: any) =>{
          this.loading = false;
          this.episodes = []
        }
       
      });

    } else{
      this.getEpisodesBySeason();
    }
 
  }

}
