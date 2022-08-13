import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaust, exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { RecipeService } from "../recipes/recipe-list/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import * as RecipeActions from "../recipes/store/recipe.actions";
import * as fromApp from "../store/app.reducer";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        "https://ng-course-recipe-book-f2379-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json",
        recipes
      )
      .subscribe((res) => console.log(res));
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        "https://ng-course-recipe-book-f2379-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((r) => {
            return { ...r, ingredients: r.ingredients ? r.ingredients : [] };
          });
        }),
        tap((recipes) => {
          this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        })
      );
  }
}
