import Search from './models/Search';
import * as searchView from './views/searchView'
import { elements, renderLoader, loaderRemove } from './views/base'
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {}

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
    await state.search.getResults();
    loaderRemove(elements.searchResContainer);

    // Render results in UI
    searchView.renderResults(state.search.result);
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
