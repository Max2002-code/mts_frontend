import {  Routes } from "@angular/router";

export const CORE_ROUTING: Routes = [
    {
        path: '', loadChildren: () => import('../../core/core.module').then(m => m.CoreModule)
    }
];