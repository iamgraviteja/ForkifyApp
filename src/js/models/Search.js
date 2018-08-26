import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query
    }

    async recipeResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'ecfb4e262942c8cd9d009bf458522c64';
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        }
        catch (error) {
            alert(error);
        }
    }

}