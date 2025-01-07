# NgxTranslate

A test project using `ngx-translate` and `@vendure/ngx-translate-extract`.

## Advantages of `ngx-translate` over Angular i18n

- Because the mapping of language code to translation strings is in our hands, language codes can contain a brand name or slug, and therefore brand specific message files can be created.
- The API is extensible, so we can create a custom loader to e.g. merge translations. In this repo I made a [custom loader](https://github.com/donna-marijne-duel/ngx-translate-eval/blob/main/src/app/custom-translate-loader.ts) which applies brand specific overrides on top of a generic message file. The brand specific overrides could come from the DB, in which case we could expose a UI to allow a brand operator to customize their messages.
- Translations are identified with a key rather than the English text. This can give translators context for the message, which is often not evident from a fragment of text.
- The behavior for missing translations is customizable, and by default it returns the message key. This will make it very obvious during testing when a translation is missing.
- The translations can be switched on the fly without a reload. I don't think this is a requirement currently, but for international brands, or brands operating in a country with multiple languages, it could be a benefit to allow the user to select a supported language. This could also benefit QA.
- Since it only uses a simple JSON format, it is quite easy to work with. The extraction tool can incrementally update existing message files with new placeholder keys as they are added.

## Advantages of Angular i18n over `ngx-translate`

- Angular i18n is designed for optimal load time, since it creates separate builds for each language with the messages compiled in. This is something that `ngx-translate` cannot match. With `ngx-translate` you can either pack all translation files into the bundle, or fetch the specific one dynamically on load (in this example, using an HTTP fetch).
- No runtime penalty, since messages are baked into the templates.
- This approach is better for SEO since the messages are static per URL.
- Since it is part of Angular, it is very unlikely to fall out of support. `ngx-translate` is an open source third-party project, albeit one with very high usage (~800k weekly downloads from NPM). `@vendure/ngx-translate-extract` (the tool I used in this eval to extract the translation strings from source) is a fork from the original project, which had become unmaintained in 2022.
