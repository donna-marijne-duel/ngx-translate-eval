import { HttpClient } from "@angular/common/http";
import { TranslationObject } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { map, Observable } from "rxjs";

type CustomLanguage = {
  code: string;
  brand?: string;
};

type TranslationsByLanguage = Record<string, TranslationObject>;
type TranslationsByBrandAndLanguage = Record<string, TranslationsByLanguage>;

/**
 * Apply brand specific overrides to generic trnaslation files.
 */
export class CustomTranslateLoader extends TranslateHttpLoader {
  private overrides: TranslationsByBrandAndLanguage = {
    rabanne: {
      "es-ES": {
        "app.copyright":
          "© {{copyrightYear}} Rabanne, reservados todos los derechos",
        "app.welcome":
          "Bienvenido a tu <strong>portal de Rabanne</strong>, {{name}}!",
      },
    },
  };

  constructor(httpClient: HttpClient) {
    super(httpClient, "./i18n/", ".json");
  }

  override getTranslation(lang: string): Observable<TranslationObject> {
    const { code, brand } = this.parseLanguage(lang);
    if (brand && this.overrides[brand][code]) {
      return super.getTranslation(code).pipe(
        map((translation) => ({
          ...translation,
          ...this.overrides[brand][code],
        })),
      );
    }

    return super.getTranslation(lang);
  }

  private parseLanguage(lang: string): CustomLanguage {
    const [language, culture, brand] = lang.split("-");
    return {
      code: `${language}-${culture}`,
      brand,
    };
  }
}
