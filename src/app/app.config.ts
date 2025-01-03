import { HttpClient, provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideTranslateService, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { routes } from "./app.routes";

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient,
) => new TranslateHttpLoader(http, "./i18n/", ".json");

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideTranslateService({ defaultLanguage: 'en-US' }),
    provideHttpClient(),
    provideTranslateService({
      useDefaultLang: false,
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
};
