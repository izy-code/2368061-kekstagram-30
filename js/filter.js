import { createRandomIdFromRangeGenerator, debounce } from './util.js';
import { renderThumbnails } from './thumbnail-gallery.js';

const RANDOM_THUMBNAILS_MAX = 10;
const RERENDER_DELAY = 500;
const ButtonId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const buttonContainerNode = document.querySelector('.img-filters');
const pictureContainerNode = document.querySelector('.pictures');

let currentFilterButtonNode = buttonContainerNode.querySelector(`#${ButtonId.DEFAULT}`);
let activeFilterButtonNode = currentFilterButtonNode;

const selectRandomPictures = (pictures) => {
  const generateRandomIndex = createRandomIdFromRangeGenerator(0, pictures.length - 1);
  const randomPicturesCount = Math.min(RANDOM_THUMBNAILS_MAX, pictures.length);

  return Array.from({ length: randomPicturesCount }, () => pictures[generateRandomIndex()]);
};

const sortByCommentsDescending = (pictures) => {
  const compareCommentCount = (a, b) => b.comments.length - a.comments.length;

  return [...pictures].sort(compareCommentCount);
};

const buttonIdToFilterHandler = {
  [ButtonId.DEFAULT]: (data) => data,
  [ButtonId.RANDOM]: selectRandomPictures,
  [ButtonId.DISCUSSED]: sortByCommentsDescending
};

const changeActiveFilterButton = (clickedButtonNode) => {
  if (clickedButtonNode !== activeFilterButtonNode) {
    clickedButtonNode.classList.add('img-filters__button--active');
    activeFilterButtonNode.classList.remove('img-filters__button--active');
    activeFilterButtonNode = clickedButtonNode;
  }
};

const removeThumbnails = () => {
  const thumbnailNodes = pictureContainerNode.querySelectorAll('a.picture');

  thumbnailNodes.forEach((thumbnailNode) => {
    thumbnailNode.remove();
  });
};

const filterThumbnails = (pictures, clickedButtonNode) => {
  if (clickedButtonNode !== currentFilterButtonNode || clickedButtonNode.id === ButtonId.RANDOM) {
    const filteredPictures = buttonIdToFilterHandler[clickedButtonNode.id](pictures);

    removeThumbnails();
    renderThumbnails(filteredPictures);
    currentFilterButtonNode = clickedButtonNode;
  }
};

const debouncedFilterThumbnails = debounce(filterThumbnails, RERENDER_DELAY);

const setThumbnailFilters = (pictures) => {
  buttonContainerNode.classList.remove('img-filters--inactive');

  buttonContainerNode.addEventListener('click', (evt) => {
    const clickedButtonNode = evt.target.closest('button.img-filters__button');

    if (clickedButtonNode) {
      changeActiveFilterButton(clickedButtonNode);
      debouncedFilterThumbnails(pictures, clickedButtonNode);
    }
  });
};

export { setThumbnailFilters };
