import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
  TranslateCacheService,
} from "angular-translate-cache";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function TranslateCacheFactory(
  translateService,
  translateCacheSettings
) {
  return new TranslateCacheService(translateService, translateCacheSettings);
}
