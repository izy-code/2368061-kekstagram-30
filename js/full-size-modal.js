import { getDataFromUrl, isEscapeKey } from './util.js';

const COMMENTS_LOAD_STEP = 5;

const pictureContainer = document.querySelector('.pictures');
const modal = document.querySelector('.big-picture');
const picture = modal.querySelector('.big-picture__img img');
const likeCount = modal.querySelector('.likes-count');
const commentCountNode = modal.querySelector('.social__comment-count');
const shownCommentCount = commentCountNode.querySelector('.social__comment-shown-count');
const totalCommentCount = commentCountNode.querySelector('.social__comment-total-count');
const commentList = modal.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');
const description = modal.querySelector('.social__caption');
const commentLoader = modal.querySelector('.comments-loader');
const modalCloseButton = modal.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeFullSizeModal();
  }
};

const createCommentNodes = (comments) => {
  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    const { avatar, message, name } = comments[i];
    const commentNode = commentTemplate.cloneNode(true);

    commentNode.querySelector('.social__picture').src = avatar;
    commentNode.querySelector('.social__picture').alt = name;
    commentNode.querySelector('.social__text').textContent = message;

    if (i >= COMMENTS_LOAD_STEP) {
      commentNode.classList.add('hidden');
    }

    commentFragment.append(commentNode);
  }

  return commentFragment;
};

function openFullSizeModal(dataObject) {
  picture.src = dataObject.url;
  likeCount.textContent = dataObject.likes;
  description.textContent = dataObject.description;

  const commentsCount = dataObject.comments.length;
  shownCommentCount.textContent = Math.min(commentsCount, COMMENTS_LOAD_STEP);
  totalCommentCount.textContent = commentsCount;
  commentLoader.classList.remove('hidden');

  if (commentsCount <= COMMENTS_LOAD_STEP) {
    commentLoader.classList.add('hidden');
  }

  commentList.replaceChildren(createCommentNodes(dataObject.comments));

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeFullSizeModal() {
  commentList.replaceChildren();

  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const addThumbnailClickHandler = (pictures) => {
  pictureContainer.addEventListener('click', (evt) => {
    const thumbnailNode = evt.target.closest('a.picture');

    if (thumbnailNode) {
      evt.preventDefault();

      const thumbnailSrc = thumbnailNode.querySelector('.picture__img').src;
      const pictureData = getDataFromUrl(thumbnailSrc, pictures, 'photos');

      openFullSizeModal(pictureData);
    }
  });
};

modalCloseButton.addEventListener('click', () => {
  closeFullSizeModal();
});

commentLoader.addEventListener('click', () => {
  const hiddenComments = commentList.querySelectorAll('.hidden');
  const newCommentsCount = Math.min(hiddenComments.length, COMMENTS_LOAD_STEP);

  shownCommentCount.textContent = +shownCommentCount.textContent + newCommentsCount;

  for (let i = 0; i < newCommentsCount; i++) {
    hiddenComments[i].classList.remove('hidden');
  }

  if (hiddenComments.length <= COMMENTS_LOAD_STEP) {
    commentLoader.classList.add('hidden');
  }
});

export { addThumbnailClickHandler };
