import Notiflix from 'notiflix';
const axios = require('axios').default;

const refs = {
  searchImagesForm: document.querySelector('search-form'),
  searchImagesInputEl: document.querySelector('.js-input'),
  galleryEl: document.querySelector('.gallery'),
};

async function getImages(keyWord) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=30483075-32508e0f0aa6f1eedcbd37828&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

getImages('cat');

// refs.searchImagesInputEl.addEventListener('submit',);



function renderImageCards(images) {
 const markup = countries
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