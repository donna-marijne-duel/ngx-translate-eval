import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from "@ngx-translate/core";
// import deDE from "../../public/i18n/de-DE.json";
// import enGB from "../../public/i18n/en-GB.json";
// import enUSVictoriasSecret from "../../public/i18n/en-US-victoriassecret.json";
// import enUS from "../../public/i18n/en-US.json";
// import deDERabanne from "../../public/i18n/partial/de-DE-rabanne.json";
// import enUSRabanne from "../../public/i18n/partial/en-US-rabanne.json";

@Component({
  standalone: true,
  selector: "app-root",
  imports: [CommonModule, FormsModule, TranslatePipe, TranslateDirective],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  protected readonly translate = inject(TranslateService);

  protected two = this.translate.stream("app.two");
  protected name = "Carla";
  protected time = 1234;
  protected welcome = this.translate.stream("app.welcome", { name: this.name });
  protected copyrightYear = 1999;

  constructor() {
    this.translate.addLangs([
      "de-DE",
      "en-GB",
      "en-US",
      "en-US-victoriassecret",
      // "de-DE-rabanne",
      // "en-US-rabanne",
    ]);

    // this.translate.setDefaultLang("en-US");

    this.translate.use("en-US");
  }

  // private initStatic(): void {
  //   this.translate.addLangs([
  //     "de-DE",
  //     "en-GB",
  //     "en-US",
  //     "en-US-victoriassecret",
  //     "de-DE-rabanne",
  //     "en-US-rabanne",
  //   ]);

  //   this.translate.setTranslation("de-DE", deDE);
  //   this.translate.setTranslation("en-GB", enGB);
  //   this.translate.setTranslation("en-US", enUS);
  //   this.translate.setTranslation("en-US-victoriassecret", enUSVictoriasSecret);
  //   this.translate.setTranslation("en-US-rabanne", enUSRabanne);
  //   this.translate.setTranslation("de-DE-rabanne", deDERabanne);
  // }
}
