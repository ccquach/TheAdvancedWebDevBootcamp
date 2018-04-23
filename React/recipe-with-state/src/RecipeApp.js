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
          id: 0,
          title: "Spaghetti",
          ingredients: ['pasta', '8 cups water', '1 box spaghetti'],
          instructions: "Open jar of Spaghetti sauce. Bring to simmer. Boil water. Cook pasta until done. Combine pasta and sauce.",
          img: "spaghetti.jpg"
        },
        {
          id: 1,
          title: "Milkshake",
          ingredients: ['1 scoops ice cream', '8 ounces milk'],
          instructions: "Combine ice cream and milk. Blend until creamy.",
          img: "milkshake.jpg"
        },
        {
          id: 2,
          title: "Avocado Toast",
          ingredients: ['3 slices of bread', '1 avocado', '1 Tbsp olive oil', '1 pinch of salt', 'pepper'],
          instructions: "Toast bread. Slice avocado and spread on bread. Add salt, oil, and pepper to taste.",
          img: "avocado_toast.jpeg"
        }
      ],
      nextRecipeId: 3,
      showForm: false
    }

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(recipe) {
    this.setState((prevState, props) => {
      const newRecipe = {...recipe, id: this.state.nextRecipeId};
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe],
        showForm: false
      }
    });
  }

  render() {
    const {showForm} = this.state;
    return (
      <div className="App">
        <NavBar onNewRecipe={() => this.setState({showForm: true})} />
        { showForm ? 
            <RecipeInput 
              onSave={this.handleSave} 
              onClose={() => this.setState({showForm: false})}
            /> :
            null }
        <RecipeList recipes={this.state.recipes} />
      </div>
    );
  }
}

export default RecipeApp;
