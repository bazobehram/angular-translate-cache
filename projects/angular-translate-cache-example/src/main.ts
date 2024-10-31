import { enableProdMode, importProvidersFrom } from '@angular/core';

import { HttpLoaderFactory, TranslateCacheFactory } from './app/app.module';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateCacheModule, TranslateCacheService, TranslateCacheSettings } from 'angular-translate-cache';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }), TranslateCacheModule.forRoot({
            cacheService: {
                provide: TranslateCacheService,
                useFactory: TranslateCacheFactory,
                deps: [TranslateService, TranslateCacheSettings]
            }
        })),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
