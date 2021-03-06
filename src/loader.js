/* eslint-disable import/no-unresolved */
import 'materialize-css/dist/js/materialize';
import 'materialize-css/dist/css/materialize.css';
/* eslint-enable import/no-unresolved */
import './scss/index.scss';
import loaderGifSrc from './loader.gif';

function renderLoader() {
  const loaderContainer = document.createElement('div');
  loaderContainer.id = 'loader-container';
  const loaderGif = new Image();
  loaderGif.src = loaderGifSrc;
  const loaderLabel = document.createElement('p');
  loaderLabel.textContent = 'Loading, please wait...';
  loaderContainer.append(loaderGif, loaderLabel);
  document.body.appendChild(loaderContainer);
}

renderLoader();
