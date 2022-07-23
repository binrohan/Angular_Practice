import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://recipesworld.in/wp-content/uploads/2022/02/breakfast.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://recipesworld.in/wp-content/uploads/2022/02/breakfast.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(recipe: Recipe){
    this.recipeSelected.emit(recipe);
  }

}
