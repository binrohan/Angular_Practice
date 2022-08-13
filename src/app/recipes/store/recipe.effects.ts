import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import * as fromApp from "../../store/app.reducer";
import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.actions";

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        "https://ng-course-recipe-book-f2379-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
      );
    }),
    map((recipes) => {
      return recipes.map((r) => {
        return { ...r, ingredients: r.ingredients ? r.ingredients : [] };
      });
    }),
    map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipeState]) => {
      return this.http
      .put(
        "https://ng-course-recipe-book-f2379-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json",
        recipeState.recipes
      )
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}
