import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { RecipeService } from "../recipes/recipe-list/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

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
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
        })
      );
  }
}
