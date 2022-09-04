const galleryEl = document.querySelector('.gallery');

function renderGallery(images) {
    const markup = images.map(image => {
        const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
        return `
            <a class="gallery__link" href="${largeImageURL}">
     <div class="photo-card" id=${id}>
            <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
            <p class="info-item">
                <b>Likes</b>${likes}</p>
            <p class="info-item">
                <b>Views</b>${views}</p>
            <p class="info-item">
                <b>Comments</b>${comments}</p>
            <p class="info-item">
                <b>Downloads</b>${downloads}</p>
        </div>
    </div>
    </a>`}).join('')

    galleryEl.insertAdjacentHTML('beforeend', markup)
}

export { renderGallery }