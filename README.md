# OnePiece API Ionic Angular

## Descripción General del proyecto

Este proyecto es una aplicación web desarrollada con Ionic y Angular que se conecta a una API pública para listar los episodios del anime One Piece. La aplicación permite a los usuarios:

- Buscar episodios por número.
- Filtrar episodios por temporada.
- Cambiar el idioma de la interfaz entre español e inglés.

## Contenidos

- [Servicios](#servicios)
  - [OnePieceService](#onepieceservice)
  - [LanguageService](#languageservice)
- [Páginas](#páginas)
  - [HomePage](#homepage)

## Servicios

### OnePieceService

Este servicio maneja las solicitudes HTTP a la API de One Piece para obtener información sobre temporadas y episodios.

**Importaciones y Decorador:**
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
```
- `HttpClient`: Módulo de Angular para realizar solicitudes HTTP.
- `Injectable`: Decorador que indica que este servicio puede ser inyectado en otros componentes o servicios.

**Propiedades:**
- `http`: Instancia de `HttpClient` inyectada utilizando la función `inject`.
- `baseUrl`: URL base de la API de One Piece.

**Métodos:**

#### `getSeasons()`

Obtiene la lista de temporadas disponibles.

```typescript
getSeasons() {
  return this.http.get(`${this.baseUrl}/seasons`, {
    headers: {
      'x-rapidapi-key': 'CLAVE_API',
      'x-rapidapi-host': 'one-piece-episodes.p.rapidapi.com'
    },
    params: { language: 'es' },
  });
}
```
- **Método**: GET
- **Endpoint**: `/seasons`
- **Parámetros**: `language` (por defecto 'es')
- **Headers**: `x-rapidapi-key`, `x-rapidapi-host`

#### `getEpisodesBySeasons(id: string)`

Obtiene los episodios de una temporada específica.

```typescript
getEpisodesBySeasons(id: string) {
  return this.http.get(`${this.baseUrl}/episodes_by_season/${id}`, {
    headers: {
      'x-rapidapi-key': 'TU_CLAVE_API',
      'x-rapidapi-host': 'one-piece-episodes.p.rapidapi.com'
    },
    params: { language: 'es' },
  });
}
```
- **Método**: GET
- **Endpoint**: `/episodes_by_season/{id}`
- **Parámetros**: `language` (por defecto 'es')
- **Headers**: `x-rapidapi-key`, `x-rapidapi-host`

#### `getEpisodesByNumber(number: string)`

Obtiene información de un episodio específico por su número.

```typescript
getEpisodesByNumber(number: string) {
  return this.http.get(`${this.baseUrl}/episode/${number}`, {
    headers: {
      'x-rapidapi-key': 'TU_CLAVE_API',
      'x-rapidapi-host': 'one-piece-episodes.p.rapidapi.com'
    },
    params: { language: 'es' },
  });
}
```
- **Método**: GET
- **Endpoint**: `/episode/{number}`
- **Parámetros**: `language` (por defecto 'es')
- **Headers**: `x-rapidapi-key`, `x-rapidapi-host`

### LanguageService

Este servicio gestiona la configuración del idioma de la aplicación utilizando `ngx-translate`.

**Importaciones y Decorador:**
```typescript
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
```
- `TranslateService`: Servicio de `ngx-translate` para manejar la traducción de textos.

**Propiedades:**
- `translate`: Instancia de `TranslateService` inyectada utilizando la función `inject`.

**Métodos:**

#### `setInitialLanguage()`

Configura el idioma inicial de la aplicación.

```typescript
setInitialLanguage() {
  const browserLang = this.translate.getBrowserLang() as string;
  const savedLang = localStorage.getItem('language');

  this.translate.setDefaultLang(browserLang);

  if (savedLang) {
    this.setLanguage(savedLang);
  } else {
    this.setLanguage(browserLang);
  }
}
```
- Obtiene el idioma del navegador.
- Verifica si hay un idioma guardado en `localStorage`.
- Establece el idioma por defecto y el idioma actual basado en lo anterior.

#### `setLanguage(lang: string)`

Cambia el idioma de la aplicación.

```typescript
setLanguage(lang: string) {
  this.translate.use(lang);
  localStorage.setItem('language', lang);
}
```
- Establece el idioma actual en `TranslateService`.
- Guarda el idioma seleccionado en `localStorage`.

## Páginas

### HomePage

La página principal de la aplicación donde los usuarios pueden buscar y filtrar episodios.

**Estructura Principal:**
```html
<ion-header>
  <ion-toolbar>
    <ion-title>{{ 'HOME.title' | translate }}</ion-title>
    <ion-buttons slot="end">
      <ion-select
        [(ngModel)]="selectedLanguage"
        (ionChange)="setLanguage()"
        toggleIcon="globe"
        interface="popover"
      >
        <ion-select-option value="es">{{ 'LANG.spanish' | translate }}</ion-select-option>
        <ion-select-option value="en">{{ 'LANG.english' | translate }}</ion-select-option>
      </ion-select>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <!-- Filtros de búsqueda -->
  <ion-item>
    <ion-label position="floating">{{ 'HOME.search_episode_by_number' | translate }}</ion-label>
    <ion-input
      (ionInput)="getEpisodesByNumber()"
      [(ngModel)]="episode_number"
      type="number"
      debounce="1000"
    ></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="stacked">{{ 'HOME.season' | translate }}</ion-label>
    <ion-select
      [okText]="'BUTTONS.accept' | translate"
      [cancelText]="'BUTTONS.cancel' | translate"
      mode="ios"
      (ionChange)="getEpisodesBySeason()"
      [(ngModel)]="selectedSeason"
    >
      <ion-select-option *ngFor="let season of seasons" [value]="season.id">{{ season.name }}</ion-select-option>
    </ion-select>
  </ion-item>

  <!-- Lista de episodios -->
  <ion-list>
    <ion-item *ngFor="let episode of episodes">
      <ion-label>{{ episode.title }}</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
```

**Componentes Clave:**

- `ion-select`: Permite cambiar el idioma de la aplicación.
- `ion-input`: Campo de entrada para buscar episodios por número.
- `ion-select`: Selector para elegir una temporada y mostrar sus episodios.

```html
<ion-select
  [(ngModel)]="selectedLanguage"
  (ionChange)="setLanguage()"
  toggleIcon="globe"
  interface="popover"
>
  <ion-select-option value="es">{{ 'LANG.spanish' | translate }}</ion-select-option>
  <ion-select-option value="en">{{ 'LANG.english' | translate }}</ion-select-option>
</ion-select>

<ion-input
  (ionInput)="getEpisodesByNumber()"
  [(ngModel)]="episode_number"
  type="number"
  labelPlacement="floating"
  [label]="'HOME.search_episode_by_number' | translate"
  debounce="1000"
></ion-input>

<ion-select
  [okText]="'BUTTONS.accept' | translate"
  [cancelText]="'BUTTONS.cancel' | translate"
  mode="ios"
  (ionChange)="getEpisodesBySeason()"
  labelPlacement="stacked"
  [label]="'HOME.season' | translate"
  [(ngModel)]="selectedSeason"
>
  <ion-select-option *ngFor="let season of seasons" [value]="season.id">{{ season.name }}</ion-select-option>
</ion-select>
```
