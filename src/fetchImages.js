import axios from 'axios';

export {fetchImages};

axios.defaults.baseURL = 'https://pixabay.com/api/'

const KEY = '29692752-5f9a27c26e6deec7970509d3f'

async function fetchImages(query, page, perPage) {
    const response = await axios.get(`?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)

    return response
    
}

