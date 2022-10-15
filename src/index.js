import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios').default;

const refs = {
  searchImagesForm: document.querySelector('.search-form'),
  searchImagesInputEl: document.querySelector('.js-input'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more')
};

let page = 1;

async function getImages(keyWord, nrPage) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=30483075-32508e0f0aa6f1eedcbd37828&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${nrPage}&per_page=40`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

function renderImageCards(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card image-link"><a href="${image.largeImageURL}">
  <img src="${image.webformatURL}" 
  data-source="${image.largeImageURL}"
  alt="${image.tags}" 
  title = "${image.tags}"
  loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${image.downloads}
    </p>
  </div>
  </a>
</div>`;
    })
    .join('');
 refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

let lightbox = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
});

refs.searchImagesForm.addEventListener('submit', onSubmitRender);


async function onSubmitRender(evt) {
  evt.preventDefault();
  refs.loadMoreBtnEl.style = 'display: none;';
  const trimedValue = refs.searchImagesInputEl.value.trim();
    if (trimedValue === '') {
      return;
    }
  const response = await getImages(trimedValue);
  const images = await response.data.hits;
  if (images.length === 0) {
    clearMarkup();
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  else {
    clearMarkup();
    renderImageCards(images);
    lightbox.refresh();
    refs.loadMoreBtnEl.style = 'display: flex;';
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
  }
  
}

refs.loadMoreBtnEl.addEventListener('click', onClickRender);

async function onClickRender() {
  const trimedValue = refs.searchImagesInputEl.value.trim();
  const response = await getImages(trimedValue, page);
  const images = await response.data.hits;
  const totalPages = await response.data.totalHits / 40;
  
  page += 1;
  if (page > Math.round(totalPages)) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    refs.loadMoreBtnEl.style = 'display: none;';
  }
    renderImageCards(images);
    lightbox.refresh();
}



function clearMarkup() {
  refs.galleryEl.innerHTML = '';
  page = 1;
}



