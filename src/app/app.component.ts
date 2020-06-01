import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  languagesObj = {
    en: {
      label: "English",
    },
    de: {
      label: "German",
    },
    ga: {
      label: "Irish",
    },
  };

  constructor(public translate: TranslateService) {
    translate.addLangs(["en", "de", "ga"]);
    translate.setDefaultLang("en");
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de|ga/) ? browserLang : "en");
  }
}
