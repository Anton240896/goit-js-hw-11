  import axios from "axios";
  import { Notify } from "notiflix";
  import { searchPicture } from "./search-api";
  import SimpleLightbox from 'simplelightbox';
  import "simplelightbox/dist/simple-lightbox.min.css"

  const API_KEY = '39074822-7a439c7ecb254f2e87bade55b';
  axios.defaults.headers.common['x-api-key'] = API_KEY

  const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: '250',
    });
 /*============================================*/


const elem = {
    form : document.querySelector('.#search-form'),
    gallery : document.querySelector('.gallery'),
    button : document.querySelector('.load-more')
}

 elem.button.addEventListener('click', buttonClick);
 function buttonClick () {
 }


  