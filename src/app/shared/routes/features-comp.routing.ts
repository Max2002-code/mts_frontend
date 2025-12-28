import {  Routes } from "@angular/router";

export const FEATURES_ROUTING: Routes = [
    {
        path: '', loadChildren: () => import('../../features/features.module').then(m => m.FeaturesModule)
    }
];