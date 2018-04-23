import React, { Component } from 'react';
import NavBar from './NavBar';
import RecipeList from './RecipeList';
import './RecipeApp.css';
import RecipeInput from './RecipeInput';

class RecipeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          id: 1,
          title: "Spaghetti",
          ingredients: ['pasta', '8 cups water', '1 box spaghetti'],
          instructions: "Open jar of Spaghetti sauce. Bring to simmer. Boil water. Cook pasta until done. Combine pasta and sauce.",
          img: "spaghetti.jpg"
        },
        {
          id: 2,
          title: "Milkshake",
          ingredients: ['1 scoops ice cream', '8 ounces milk'],
          instructions: "Combine ice cream and milk. Blend until creamy.",
          img: "milkshake.jpg"
        },
        {
          id: 3,
          title: "Avocado Toast",
          ingredients: ['3 slices of bread', '1 avocado', '1 Tbsp olive oil', '1 pinch of salt', 'pepper'],
          instructions: "Toast bread. Slice avocado and spread on bread. Add salt, oil, and pepper to taste.",
          img: "avocado_toast.jpeg"
        }
      ],
      nextRecipeId: 3
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <RecipeInput />
        <RecipeList recipes={this.state.recipes} />
      </div>
    );
  }
}

export default RecipeApp;
