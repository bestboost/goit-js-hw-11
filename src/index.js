import { fetchImages } from './fetchImages'
import { renderGallery } from './renderGallery'

import Notiflix from 'notiflix'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.btn-load-more')
const loading = document.querySelector('.loading');

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);


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
                alertNoImagesFound()
            } else {
                renderGallery(data.hits)
                simpleLightBox = new SimpleLightbox('.gallery a').refresh()
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
        simpleLightBox.destroy()
       
        fetchImages(query, page, perPage)
            .then(({ data }) => {
            renderGallery(data.hits)
            simpleLightBox = new SimpleLightbox('.gallery a').refresh()
        loading.classList.remove('show');
        const totalPages = Math.ceil(data.totalHits / perPage)
                if (page > totalPages) {
                
                loadMoreBtn.classList.add('is-hidden')
            

                alertEndOfSearch()
                }
            })
    .catch(error => console.log(error))
}
        
function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
}

function alertNoEmptySearch() {
     Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.')
}

function alertNoImagesFound() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}

function alertEndOfSearch() {
  Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
}