import Search from "./models/Search";
import Recipe from "./models/Recipe";
import { elements, renderLoader, removeLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

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
        //Prepare UI for result.
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected recipe
        if (state.search) searchView.highlightSelRec(id);

        //Create recipe object
        state.recipe = new Recipe(id);

        try {
            //get recipe details and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //cal. time and servings
            state.recipe.calcServings();
            state.recipe.calcTime();

            //Upadate UI
            removeLoader();
            recipeView.renderRecipe(state.recipe);
            //console.log(state.recipe);
        }
        catch (err) {
            alert(`Error in loading recipe!`);
            removeLoader();
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeControl));


elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease,.btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServIng(state.recipe);
        }
    } else if (e.target.matches('.btn-increase,.btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServIng(state.recipe);
    }
    console.log(state.recipe);
});







