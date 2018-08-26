import Search from "./models/Search";
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
        //get search results
        await state.search.recipeResults();

        //Render results in UI
        removeLoader();
        searchView.renderResult(state.search.result);
        //console.log(state.search.result);
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

















