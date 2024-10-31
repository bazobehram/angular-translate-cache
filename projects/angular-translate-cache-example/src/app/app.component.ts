import { Component } from '@angular/core';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TranslateCacheService } from 'angular-translate-cache';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [TranslateModule]
})
export class AppComponent {
  title = 'angular-translate-cache-example';

  constructor(translateService: TranslateService, translateCacheService: TranslateCacheService) {
    translateService.setDefaultLang('es');
    translateCacheService.init();
  }
}
