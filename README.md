
# angular-translate-cache
[![NPM version][npm-version-image]][npm-url]  
[![MIT License][license-image]][license-url]  

Based on and extended from [angular-translate][angular-translate-url].  
Forked from the original repository to introduce improvements by [Behram Bazo](mailto:bazobehram@hotmail.com).

This is a simplified version of [localize-router][localize-router-url].  
If you’re already using *localize-router*, this extension is likely unnecessary.  
The primary purpose of this extension is to facilitate language caching with *angular-translate*.

| Angular version | Integration branch | Library version |
|:---------------:|:------------------:|:---------------:|
|   8 and below   |     angular1-8     |      ^0.0.0     |
|        9        |     angular9       |      ^9.0.0     |
|        10       |     angular10      |      ^10.0.0    |
|        11       |     angular11      |      ^11.0.0    |
|        12       |     angular12      |      ^12.0.0    |
|        13       |     angular13      |      ^13.0.0    |
|        14       |     angular14      |      ^14.0.0    |
|        15       |     angular15      |      ^15.0.0    |
|        16       |     angular16      |      ^16.0.0    |
|        17       |     angular17      |      ^17.0.0    |
|        18       |     angular18      |      ^18.0.0    |

## Installation

To install this library, run:

```bash
$ npm install angular-translate-cache --save
```

## Usage (Standalone Setup)

Angular now supports the standalone components model, enabling more modular design. Here’s how to set up `angular-translate-cache` using standalone components with Angular's new build system.

```typescript
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@angular-translate/core';
import { TranslateCacheModule, TranslateCacheSettings, TranslateCacheService } from 'angular-translate-cache';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      TranslateModule.forRoot(),
      TranslateCacheModule.forRoot({
        cacheService: {
          provide: TranslateCacheService,
          useFactory: (translateService: TranslateService, translateCacheSettings: TranslateCacheSettings) => {
            return new TranslateCacheService(translateService, translateCacheSettings);
          },
          deps: [TranslateService, TranslateCacheSettings],
        },
      })
    ),
  ],
});
```

### Initializing

For standalone components, initialize the translation and caching services within the component itself:

```typescript
import { Component } from '@angular/core';
import { TranslateService } from '@angular-translate/core';
import { TranslateCacheService } from 'angular-translate-cache';

@Component({
  selector: 'app-root',
  template: `<div>{{ 'HELLO' | translate }}</div>`,
  standalone: true,
  imports: [TranslateService, TranslateCacheService]
})
export class AppComponent {
  constructor(private translateService: TranslateService, private translateCacheService: TranslateCacheService) {
    this.translateService.setDefaultLang('en');
    this.translateCacheService.init();
  }
}
```

This setup uses the `init` method of `TranslateCacheService` to cache the selected language, falling back to the browser’s current language or a default.

### Cache Configuration Options

You can customize cache settings by defining options within the `TranslateCacheModule.forRoot` method:

```typescript
TranslateCacheModule.forRoot({
  cacheService: {
    provide: TranslateCacheService,
    useFactory: (translateService, translateCacheSettings) => {
      return new TranslateCacheService(translateService, translateCacheSettings);
    },
    deps: [TranslateService, TranslateCacheSettings],
  },
  cacheName: 'mylang',          // Default is 'lang'.
  cacheMechanism: 'Cookie',      // Default is 'LocalStorage'.
  cookieExpiry: 1,               // Default is 720 hours (1 month).
  cookieAttributes: 'SameSite=Strict; Secure' // Additional cookie attributes.
});
```

## License

MIT © [Behram Bazo](mailto:bazobehram@hotmail.com)

[npm-url]: https://www.npmjs.com/package/angular-translate-cache  
[npm-version-image]: https://badge.fury.io/js/angular-translate-cache.svg  

[license-image]: https://img.shields.io/npm/l/express.svg?style=flat  
[license-url]: LICENSE  

[angular-translate-url]: https://github.com/angular-translate/core  
[localize-router-url]: https://github.com/Greentube/localize-router  
