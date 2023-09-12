 /*===================IMPORT=========================*/
 import { Notify } from 'notiflix';
 const axios = require('axios').default;
 import SimpleLightbox from 'simplelightbox';
  import 'simplelightbox/dist/simple-lightbox.min.css';
 
  /*===================LET=========================*/
 
 let searchQueryResult = '';
 let q = '';
 let pageOne = 1;
 
 
 
  /*==================PIXABAYAPI==========================*/
 
 const pixabayAPI = {
 
         baseUrl: 'https://pixabay.com/api/',
         key: '39074822-7a439c7ecb254f2e87bade55b',
         image_type: "photo",
         orientation: "horizontal",
         safesearch: "true",
         page: '1',
         per_page: "27",
 
 };
     
  /*===================MARKUPDATA=========================*/
 const markupData = {
     markup: "",
     htmlCode: "",
 };
 
  /*=====================ELEM=======================*/
 const elem = {
  btnLoadMore : document.querySelector('.load-more'),
  form : document.querySelector('.search-form'),
  gallery : document.querySelector('.gallery'),
   simpleLightbox : new SimpleLightbox('.gallery a'),
 }
 
 //default button invesible
 elem.btnLoadMore.style.display = 'none';
 
 
  /*===================SUBMIT=========================*/
  elem.form.addEventListener("submit", async (evt) => {
     evt.preventDefault();
 
     const { elements: { searchQuery } } = evt.currentTarget;
     
     //let
     searchQueryResult = searchQuery.value;
     if (searchQueryResult === '') {
         elem.gallery.innerHTML = '';
         elem.btnLoadMore.style.display = 'none';
 
         return Notify.failure('❌Sorry, there are no images matching your search query. Please try again.');
             
     };
             //let
     if (searchQueryResult !== q) {
         //let
         pageOne = 1;
         pixabayAPI.page = `${pageOne}`;
 
         elem.gallery.innerHTML = q;
 
         elem.btnLoadMore.style.display = 'block';
 
     } else {
         pageOne += 1;
         pixabayAPI.page = `${pageOne}`;
         elem.btnLoadMore.style.display = 'none';
 
     };
     
     q = searchQueryResult;
     
     try {
 
         const results = await fetchPhotos(searchQueryResult);
         markupData.htmlCode = await renderPhotos(results);
 
         elem.gallery.insertAdjacentHTML("beforeend", markupData.htmlCode);
       
         elem.btnLoadMore.disabled = false;
    
         // simpleLightbox gallery 
        elem.simpleLightbox.refresh();
         
         const { baseUrl, key, image_type, orientation, safesearch, page, per_page } = pixabayAPI;
         const { total, totalHits, images} = results;    
         const totalPages = Math.ceil(totalHits / per_page);  
         
         if (page >= totalPages) {     
             elem.btnLoadMore.style.display = 'none'; 
             };
             Notify.success(`'👌Hooray! We found ${results.totalHits} images.'`);
 
     }
 
     catch (error) {
         elem.btnLoadMore.style.display = 'none'; 
 
         Notify.failure('❌Sorry, there are no images matching your search query. Please try again.');
 
     };
 });
 
  /*==================LOAD MORE==========================*/
 elem.btnLoadMore.addEventListener("click", async () => {
 
         pageOne += 1;
         pixabayAPI.page = `${pageOne}`;
 
     try {
 
         const results = await fetchPhotos(searchQueryResult);
         markupData.htmlCode = await renderPhotos(results);
         
         elem.gallery.insertAdjacentHTML("beforeend", markupData.htmlCode);
        
         // simpleLightbox gallery 
        elem.simpleLightbox.refresh();
 
        
         if (page >= totalPages) {         
             elem.btnLoadMore.style.display = 'none';          
         };
         console.log("results", results);
     }
 
     catch (error) {   
         Notify.failure(" ❌We're sorry, but you've reached the end of search results.");
     }
 });
 
  /*====================FETCH REQUEST========================*/
 async function fetchPhotos(searchQueryResult) {
 
     const { baseUrl, key, image_type, orientation, safesearch, page, per_page } = pixabayAPI;
 
     pixabayAPI.page = `${pageOne}`;
     
     const response = await axios.get(`${baseUrl}?key=${key}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}`);
     const results = response.data;
    
     const {total, totalHits,  hits } = results;
     const totalPages = Math.ceil(totalHits/ per_page);
     
     if (total === 0) {
     throw new Error();
     };
 
     console.log(totalHits);
 
     return results;
 };
 
  /*====================RENDER========================*/
 async function renderPhotos(results) {
 
     const { hits } = results;
 
     markupData.markup =  hits.map((hit ) =>
         `<a href="${hit.largeImageURL}"><div class="photo-card">
         <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy"
           class="img-item" />
         <div class="info">
     <p class="info-item">
       <b>❤️:</b>${hit.likes}
     </p>
     <p class="info-item">
       <b>😶:</b>${hit.views}
     </p>
     <p class="info-item">
       <b>🖊:</b>${hit.comments}
     </p>
     <p class="info-item">
       <b>🠗:</b>${hit.downloads}
     </p>
   </div>
 </div></a>`).join("");
     
     return markupData.markup;
     
 };


//  import Notiflix from 'notiflix';
// import { PicAPI } from './getPic';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: '250',
// });

// const picApi = new PicAPI();

// const refs = {
//     formElem: document.querySelector('#search-form'),
//     picListElem: document.querySelector('.gallery'),
//     loadMoreBtn: document.querySelector('.load-more'),
//   };

//   refs.formElem.addEventListener('submit', onFormSubmit);
//   refs.loadMoreBtn.addEventListener('click', onLoadBtnClick);

//   async function onLoadBtnClick(e) {
//     try {
//       const data = await picApi.getPic();
//       renderPic(data.hits);
//       if (picApi.PAGE >= picApi.TOTAL_PAGES) {
//         Notiflix.Notify.warning(
//           "We're sorry, but you've reached the end of search results."
//         );
//         refs.loadMoreBtn.disabled = true;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function onFormSubmit(e) {
//     e.preventDefault();
//     const query = e.target.elements.searchQuery.value;
  
//     if (query.trim() === '') {
//       Notiflix.Notify.failure('Please enter a search query.');
//       return;
//     }
  
//     refs.picListElem.innerHTML = '';
  
//     picApi.resetPage();
//     picApi.QUERY = query;
//     try {
//       const data = await picApi.getPic();
//       if (data.hits.length === 0) {
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         return;
//       }
//       refs.loadMoreBtn.disabled = false;
  
//       if (data.hits.length < picApi.PerPage) {
//         refs.loadMoreBtn.disabled = true;
//       }
  
//       renderPic(data.hits);
//       showTotalHits(data.totalHits);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   function markupHits(hits) {
//     return hits
//       .map(element => {
//         return `<a class="photo-card" href="${element.largeImageURL}">
         
//             <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
//             <div class="info">
//               <p class="info-item">
//           <b>Likes: ${element.likes}</b>
//               </p>
//               <p class="info-item">
//           <b>Views: ${element.views}</b>
//               </p>
//               <p class="info-item">
//           <b>Comments: ${element.comments}</b>
//               </p>
//               <p class="info-item">
//           <b>Downloads: ${element.downloads}</b>
//               </p>
//             </div>
         
//         </a>`;
//       })
//       .join('');
//   }

//   function renderPic(hits) {
//     const markup = markupHits(hits);
//     refs.picListElem.insertAdjacentHTML('beforeend', markup);
//     lightbox.refresh();
//   }
  
//   function showTotalHits(totalHits) {
//     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//   }