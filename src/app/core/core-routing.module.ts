import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { SearchPositionComponent } from "./search-position/search-position.component";
import { NotificaComponent } from "./notifica/notifica.component";
import { MovementTrackingComponent } from "./movement-tracking/movement-tracking.component";
import { ViweClientComponent } from "../client/viwe-client/viwe-client.component";
import { AdminUsersComponent } from "./admin-users/users-management.component";

const routes: Routes = [
    {
        path: '',
        children : [
            { path: 'home', component: HomeComponent },
            { path: 'search', component:SearchPositionComponent },
            { path: 'notifica', component:NotificaComponent },
            { path: 'movements', component: MovementTrackingComponent },
            { path: 'client', component: ViweClientComponent }, // ✅ aggiunta rotta client
            { path: 'admin-users', component: AdminUsersComponent }
        ]
    }
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class CorePagesRoutingModule{}