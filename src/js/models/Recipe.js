import axios from "axios";
import { key, proxy } from "../config";

export default class Recipe {
    constructor(id) {
        this.id = id
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.ingredients = res.data.recipe.ingredients;
            this.url = res.data.recipe.source_url;
        }
        catch (error) {
            console.log(error);
            alert(`Something went wrong :(`);
        }
    }

    calcTime() {
        //15 mins. for 3 ingredients
        this.time = Math.ceil(this.ingredients.length / 3) * 15;
    }
    calcServings() {
        this.servings = 4;
    }
}