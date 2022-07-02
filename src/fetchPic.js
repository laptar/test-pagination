const BASE_URL = 'https://pixabay.com/api/';
const apiKey = 'key=28350803-646ac60833af8cee69618d9eb';
const imgType = 'image_type=photo';
const orientation = 'orientation=horizontal';
const safesearch = 'safesearch=true';
const perPage = 40;

// function searchImg(searchTxt, page) {
//   return fetch(
//     `${BASE_URL}?${apiKey}&q=${searchTxt}&${imgType}&${orientation}&${safesearch}&page=${page}&per_page=${perPage}`
//   )
//     .then(res => {
//       // console.log(res);
//       if (!res.ok) {
//         throw new Error(res.status);
//       }
//       return res.json();
//     })
//     .then(data => data);
// }

async function searchImg(searchTxt, page) {
  const res = await fetch(
    `${BASE_URL}?${apiKey}&q=${searchTxt}&${imgType}&${orientation}&${safesearch}&page=${page}&per_page=${perPage}`
  );
  const data = await res.json();

  return data;
}

export { searchImg, perPage };
