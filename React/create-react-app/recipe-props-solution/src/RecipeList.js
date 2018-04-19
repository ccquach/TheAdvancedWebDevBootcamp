import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import './RecipeList.css';

class RecipeList extends Component {
  static defaultProps = {
    recipes: [
      {
        title: "Spaghetti",
        ingredients: ['pasta', '8 cups water', '1 box spaghetti'],
        instructions: "Open jar of Spaghetti sauce. Bring to simmer. Boil water. Cook pasta until done. Combine pasta and sauce.",
        img: "spaghetti.jpg"
      },
      {
        title: "Milkshake",
        ingredients: ['1 scoops ice cream', '8 ounces milk'],
        instructions: "Combine ice cream and milk. Blend until creamy.",
        img: "milkshake.jpg"
      },
      {
        title: "Avocado Toast",
        ingredients: ['3 slices of bread', '1 avocado', '1 Tbsp olive oil', '1 pinch of salt', 'pepper'],
        instructions: "Toast bread. Slice avocado and spread on bread. Add salt, oil, and pepper to taste.",
        img: "avocado_toast.jpeg"
      }
    ]
  }

  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    const recipes = this.props.recipes.map((r, index) => (
      <Recipe key={index} {...r} />
    ));

    return (
      <div className="recipe-list">
        {recipes}
      </div>
    );
  }
}

export default RecipeList;