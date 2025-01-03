import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [CommonModule, TranslatePipe, TranslateDirective],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  private readonly translate = inject(TranslateService);

  protected two = this.translate.stream("app.two");

  constructor() {
    this.translate.addLangs(["de", "en"]);
    this.translate.setDefaultLang("en");
    this.translate.use("en");
  }
}
