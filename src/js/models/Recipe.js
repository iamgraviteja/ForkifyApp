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
            this.src = res.data.recipe.image_url;
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

    parseIngredients() {
        const longUnits = ['ounces', 'ounce', 'teaspoons', 'teaspoon', 'tablespoons', 'tablespoon', 'cups', 'pounds', 'inches'];
        const shortUnits = ['oz', 'oz', 'tsp', 'tsp', 'tbsp', 'tbsp', 'cup', 'pound', 'inch'];
        const units = [...shortUnits, 'kg', 'g'];
        const newIngredients = this.ingredients.map(ing => {
            let ingredient = ing.trim().toLowerCase();

            //Shorten units
            longUnits.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, shortUnits[i]);
            });

            //Replace parentheses and content in it with blank space.
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //Seperate unit and quantity
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => units.includes(el));
            let ingObj;

            if (unitIndex > -1) { //if unit and quantity is present
                const count = arrIng.slice(0, unitIndex).join('+').replace('-', '+');
                ingObj = {
                    count: eval(count),
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            }
            else if (parseInt(arrIng[0], 10)) { //if quantity alone is present
                ingObj = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }
            else if (unitIndex === -1) { //if no qty. and unit is present
                ingObj = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return ingObj;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        let updatedSer;
        //Update servings
        if (type === 'dec') {
            updatedSer = this.servings - 1;
        } else {
            updatedSer = this.servings + 1;
        }
        //Update ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (updatedSer / this.servings);
        });
        
        this.servings = updatedSer;
    }



}