import axios from 'axios';


const API_KEY = '39074822-7a439c7ecb254f2e87bade55b';
axios.defaults.headers.common['x-api-key'] = API_KEY;

export async function searchPicture(inputValue, currentPage = '1') {
  
const BASE_URL = 'https://pixabay.com/api/';
const params = new URLSearchParams ({
  key: '39074822-7a439c7ecb254f2e87bade55b',
  q: inputValue,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: currentPage,
  per_page: 40,
});

const response = await axios.get(`${BASE_URL}?${params}`);

  return response;
}
