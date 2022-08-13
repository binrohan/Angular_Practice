import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as ShoppingListActions from "src/app/shopping-list/store/shopping-list.actions";
import * as fromApp from "src/app/store/app.reducer";
import { map, switchMap, tap } from "rxjs/operators";
import * as RecipeActions from "../store/recipe.actions";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.css"],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => +params["id"]),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipe');
      }),
      map(recipeState => recipeState.recipes.find((r, index) => index === this.id))
    ).subscribe(recipe => this.recipe = recipe);
  }

  onAddToShoppingLIst() {
    // this.shoppingListService.addIngredients(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDelete() {
    // this.recipeService.delete(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(["/recipes"]);
  }
}
