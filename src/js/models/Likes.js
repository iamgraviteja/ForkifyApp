export default class Likes {
    constructor() {
        this.likes = [];
    }
    addLike(id, title, author, img) {
        const like = { id, title, author, img }
        this.likes.push(like);

        //Add like to localStorage
        this.persistentLikes();
        return like;
    }

    removeLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        //Remove like from localStorage
        this.persistentLikes();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    likesCount() {
        return this.likes.length;
    }

    persistentLikes() {
        const likes = localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const likes = localStorage.getItem('likes');
        if (likes) this.likes = JSON.parse(likes);
    }
}