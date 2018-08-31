import { elements } from './base';
import { modifyTitle } from "./searchView";

export const toggleLiked = isLiked => {
    const svgString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${svgString}`)
};

export const toggleLikesMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const addLikeToList = like => {
    const markUp = `
            <li>
                <a class="likes__link" href="#${like.id}">
                    <figure class="likes__fig">
                        <img src="${like.img}" alt="${like.title}">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${modifyTitle(like.title)}</h4>
                        <p class="likes__author">${like.author}</p>
                    </div>
                </a>
            </li>`;
    elements.likesList.insertAdjacentHTML('beforeend', markUp);
};

export const removeLikeFromList = id => {
    const elem = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    elem.parentElement.removeChild(elem);

};