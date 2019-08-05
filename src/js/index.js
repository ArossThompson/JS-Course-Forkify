import Search from './models/Search';
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, loaderRemove } from './views/base'
import Recipe from './models/Recipe'


/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {}

///////////
// Search controller

const controlSearch = async () => {
  // Get Query from the View
  const query = searchView.getInput();
  console.log(query);
  if(query) {
    // New Search object & add to state. 
    state.search = new Search(query);

    // Prepare UI for results 
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResContainer);
    // Search for recipes

    try {
      await state.search.getResults();

      // Render results in UI
      loaderRemove(elements.searchResContainer);

      if (state.search.result.length === 0 ) {
        searchView.noResults(query);
      } else {
        // 5) render results on UI
        searchView.renderResults(state.search.result);
      }
    }
    catch(error) {
      console.log(error);
      alert('something went wrong with the search');
      loaderRemove(elements.searchResContainer);
    }
    
  }

}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline')
  if(btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
})


///////////////
//// Recipe Controller

const controlRecipe = async () => {
  // Get id from url
  const id = window.location.hash.replace('#', '');
  console.log(id);


  if(id) {
    // prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe)
    // Create new recipe object
    state.recipe = new Recipe(id);

    // Highlight selected
    if(state.search) {
      searchView.highlightedSelected(id);
    }

    try {
      // Get recipe Data and parse ings
      await state.recipe.getRecipe()
      state.recipe.parseIngredients();

      // Call time and servings functions
      state.recipe.calcTime();
      state.recipe.calcServings();
      // Render recipe to UI
      loaderRemove(elements.recipe);
      recipeView.renderRecipe(state.recipe);
    }
    catch(error) {
      console.log(error);
      alert('Error processing recipe')
    }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe)); 