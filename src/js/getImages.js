const axios = require('axios').default;

export async function getImages(keyWord, nrPage) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=30483075-32508e0f0aa6f1eedcbd37828&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${nrPage}&per_page=40`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
