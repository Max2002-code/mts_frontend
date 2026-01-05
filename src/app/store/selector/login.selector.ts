import { createSelector } from '@ngrx/store';
import { AppState } from "src/app/app.module";

export const selectAuth = (state: AppState) => state.auth

export const getToken = createSelector(
    selectAuth,
    (auth:any) => auth
)
