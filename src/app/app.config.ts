import { HttpClient, provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideTranslateService, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { routes } from "./app.routes";
import { CustomTranslateLoader } from "./custom-translate-loader";

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient,
) => new TranslateHttpLoader(http, "./i18n/", ".json");

const customLoaderFactory: (http: HttpClient) => CustomTranslateLoader = (
  http: HttpClient,
) => new CustomTranslateLoader(http);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideTranslateService({ defaultLanguage: 'en-US' }),
    provideHttpClient(),
    // provideTranslateService({
    //   useDefaultLang: false,
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: httpLoaderFactory,
    //     deps: [HttpClient],
    //   },
    // }),
    provideTranslateService({
      useDefaultLang: false,
      loader: {
        provide: TranslateLoader,
        useFactory: customLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
};
