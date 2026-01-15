import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { ViweClientComponent } from "../client/viwe-client/viwe-client.component";
import { NotificaComponent } from "../core/notifica/notifica.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'client', component: ViweClientComponent }, // ✅ aggiunta rotta client
      { path: 'notifica', component: NotificaComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesPagesRoutingModule {}
