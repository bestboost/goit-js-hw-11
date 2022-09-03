import Notiflix from 'notiflix';

import { fetchImages } from "./fetchImages";
import renderGallery  from "./templates/renderGallery.hbs";

export{ onLoadMoreBtn }

const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.btn-load-more')
const loading = document.querySelector('.loading');


let query = '';
let page = 1;
const perPage = 40;

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function renderGallery(images) {
    const markup = images.map(image => {
        const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
        gallery.insertAdjacentHTML('beforeend', markup)
        // return; 
       
    },
  
)}

function onSearchForm(e) {
    e.preventDefault();
    page = 1;
    query = e.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
     loadMoreBtn.classList.add('is-hidden')

         if (query === '') {
            alertNoEmptySearch()
             return
            }
    
    fetchImages(query, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                noImagesFound()
            } else {
                renderGallery(data.hits)
              
                alertImagesFound(data)
                 if (data.totalHits > perPage) {
                     loadMoreBtn.classList.remove('is-hidden')
                                         }
                }
          })
    .catch(error => console.log(error))
}

    function onLoadMoreBtn() {
      page += 1
       
        fetchImages(query, page, perPage)
            .then(({ data }) => {
            renderGallery(data.hits)
        
        loading.classList.remove('show');
        const totalPages = Math.ceil(data.totalHits / perPage)
                if (page > totalPages) {
                
                loadMoreBtn.classList.add('is-hidden')
            

                loadMoreImages ()
                }
            })
    // .catch(error => console.log(error))
}
  

function alertImagesFound(data) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
  }
    
function loadMoreImages () {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }

function noImagesFound() {
Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}


        
    