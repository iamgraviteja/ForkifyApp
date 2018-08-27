import Search from "./models/Search";
import Recipe from "./models/Recipe";
import { elements, renderLoader, removeLoader } from './views/base';
import * as searchView from './views/searchView';

/**
 * Global Store
 * - Search object
 * - Current recipe
 * - Shopping list
 * - Liked recipes
 */

const state = {};

/**
 * SEARCH CONTROLLER
 */
const searchControl = async () => {

    //get query
    const query = searchView.getInput();

    if (query) {
        //create search obj.
        state.search = new Search(query);

        //Prepare UI for result.
        searchView.clearInput();
        searchView.clearRecRes();
        renderLoader(elements.searchRes);
        try {
            //get search results
            await state.search.recipeResults();

            //Render results in UI
            removeLoader();
            searchView.renderResult(state.search.result);
            //console.log(state.search.result);
        }
        catch (err) {
            alert(`Error in loading search results!`);
            removeLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchControl();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const page = parseInt(btn.dataset.goto, 10);
        searchView.clearRecRes();
        searchView.renderResult(state.search.result, page);
    }
});

/**
 * RECIPE CONTROLLER
 */

const recipeControl = async () => {

    //get ID from URL
    const id = window.location.hash.replace('#', '');
    if (id) {
        console.log(id);
        //Create recipe object
        const recipe = new Recipe(id);

        try {
            //get recipe details
            await recipe.getRecipe();

            //cal. time and servings
            recipe.calcServings();
            recipe.calcTime();

            //Upadate UI
            console.log(recipe);
        }
        catch (err) {
            alert(`Error in loading recipe!`);
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeControl));










