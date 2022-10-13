import Notiflix from 'notiflix';
const axios = require('axios').default;

const refs = {
  searchImagesForm: document.querySelector('.search-form'),
  searchImagesInputEl: document.querySelector('.js-input'),
  galleryEl: document.querySelector('.gallery'),
};

let page = 1;

async function getImages(keyWord) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=30483075-32508e0f0aa6f1eedcbd37828&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}



refs.searchImagesForm.addEventListener('submit', onSubmitRender);



async function onSubmitRender(evt) {
  evt.preventDefault();
   clearMarkup();
  const trimedValue = refs.searchImagesInputEl.value.trim();
  const response = await getImages(trimedValue);
  const images = await response.data.hits;
  if (images.length === 0) {
    clearMarkup();
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  renderImageCards(images);
}

function renderImageCards(images) {
 const markup = images
   .map(image => {
     return `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
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
</div>`;
   })
   .join('');
 refs.galleryEl.innerHTML = markup;
}

function clearMarkup() {
  refs.galleryEl.innerHTML = '';
  }