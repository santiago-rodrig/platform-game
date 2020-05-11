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
