import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileSettingsComponent } from "./components/profile-settings/profile-settings.component";
import { TranslateModule, TranslatePipe } from "@ngx-translate/core";

const routes: Routes = [
  { path: "", redirectTo: "profile", pathMatch: "full" },
  { path: "profile", component: ProfileSettingsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes),
    TranslateModule,
  ],
  exports: [RouterModule, TranslatePipe],
  providers: [TranslateModule],
})
export class AppRoutingModule {}
