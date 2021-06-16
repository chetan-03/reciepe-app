import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';
function App() {
  const APP_ID = 'ab6150f3';
  const APP_KEYS = 'd95488aa4019accbae0ca0ef35c628f6';
  const [recipes, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Chicken");
  useEffect( () =>{
    getRecipe();
  },[query]);
  const getRecipe = async() =>{
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}`);
    const data = await response.json();
    setRecipe(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("")
  };
  return (
    <div className="App">
      <form onSubmit = {getSearch} className= 'search-form'>
        <input className= 'search-bar' type="text" value={search} onChange = {updateSearch} />
        <button className= 'search-button' type='submit'> Search </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key = {recipe.recipe.label}
        title = {recipe.recipe.label}
        calories = {recipe.recipe.calories}
        img = {recipe.recipe.image} alt = ' image not found '
        ingredients = {recipe.recipe.ingredients} />
      ))}
      </div>
    </div>
  );
}

export default App;
