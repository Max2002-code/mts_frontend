import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { SearchPositionComponent } from "./search-position/search-position.component";

const routes: Routes = [
    {
        path: '',
        children : [
            { path: 'home', component: HomeComponent },
            { path: 'search', component:SearchPositionComponent }
        ]
    }
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class CorePagesRoutingModule{}