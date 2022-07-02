import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchImg, perPage } from './fetchPic';
import { renderGallary } from './render';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

Notify.init({
  position: 'center-top',
  distance: '50px',
});

const gallaryEl = document.querySelector('.gallery');
const formEl = document.querySelector('.search-form');
const btnLoadMoreEl = document.querySelector('.load-more');
let page = 1;
let searchValue = '';

let gallery = new SimpleLightbox('.gallery a');

formEl.addEventListener('submit', onSubmit);
btnLoadMoreEl.addEventListener('click', onClick);

function onClick() {
  page += 1;

  searchImg(searchValue, page).then(data => {
    gallaryEl.insertAdjacentHTML('beforeend', renderGallary(data));
    gallery.refresh();
    if (perPage * page >= data.totalHits) {
      btnLoadMoreEl.classList.remove('show');
    }
    btnLoadMoreEl.textContent = `More - ${data.totalHits - page * perPage}`;
  });
}

function onSubmit(evt) {
  evt.preventDefault();
  searchValue = evt.target.searchQuery.value.trim();
  gallaryEl.innerHTML = '';
  if (!searchValue) {
    Notify.info('Please enter a request');
    formEl.reset();
    return;
  }

  page = 1;
  searchImg(searchValue, page)
    .then(data => {
      gallaryEl.insertAdjacentHTML('beforeend', renderGallary(data));
      gallery.refresh();
      console.log(data.totalHits);
      if (!data.hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        if (btnLoadMoreEl.classList.contains('show')) {
          btnLoadMoreEl.classList.remove('show');
        }
      } else if (data.totalHits <= perPage) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        if (btnLoadMoreEl.classList.contains('show')) {
          btnLoadMoreEl.classList.remove('show');
        }
      } else {
        btnLoadMoreEl.textContent = `More - ${data.totalHits - page * perPage}`;
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        if (!btnLoadMoreEl.classList.contains('show')) {
          btnLoadMoreEl.classList.add('show');
        }
      }
    })
    .catch(error => Notify.failure(error));
}
