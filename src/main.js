import { searchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const book = new SimpleLightbox('.list_gallery a');

const form = document.querySelector('.main_form');
const myGallery = document.querySelector('.list_gallery');

const loadEl = document.querySelector('.loader');



form.addEventListener("submit", handlerForm);
function handlerForm(event) {
    event.preventDefault();
    loadEl.classList.add('loading');
    myGallery.innerHTML = '';
    let searchWord = event.currentTarget.elements.inputElement.value;
    event.currentTarget.elements.inputElement.value = "";  
    searchImages(searchWord)
        .then(data => {
            if (data.total == 0) {
                iziToast.show({
                    title: 'Ops.',
                    titleColor: 'white',
                    message:
                        'Sorry, there are no images matching your search query. Please try again!',
                    messageColor: 'white',
                    color: 'red',
                    position: 'topCenter',
                    timeout: '5000',
                });
                return 0;
            } else {
                myGallery.insertAdjacentHTML('beforeend', renderGallery(data));
                book.refresh();
            }
        })
        .catch(error => {
            iziToast.show({
                title: 'Ops.',
                titleColor: 'white',
                message: error,
                messageColor: 'white',
                color: 'red',
                position: 'topCenter',
                timeout: '5000',
            });
        })
        .finally(() => { 
            loadEl.classList.remove('loading')
        });
}




