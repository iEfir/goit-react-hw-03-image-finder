import axios from 'axios';

export async function fetchPictures(searchQuery, searchPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const url = `${BASE_URL}?key=33791958-7f39aab7db440c1e8f9841af1&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${searchPage}`;

  const fetchPictures = await axios.get(url);
  const pictures = fetchPictures.data.hits;

  const totalHitsPictures = fetchPictures.data.totalHits;

  return { pictures: pictures, totalHitsPictures: totalHitsPictures };
}
