import uniqid from "uniqid";

export default class List {
    constructor() {
        this.items = [];
    }
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    removeItem(id) {
        const i = this.items.findIndex(el => el.id === id);
        this.items.splice(i, 1);
    }

    removeAllItems() {
        this.items = [];
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }

    getNumItems() {
        return this.items.length;
    }
}