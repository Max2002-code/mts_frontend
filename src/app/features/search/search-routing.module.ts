// src/app/features/search/search-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPositionComponent } from 'src/app/shared/components/search-position/search-position.component';

const routes: Routes = [
  { path: '', component: SearchPositionComponent } // /search
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
