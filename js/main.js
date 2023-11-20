import { addPictureUploadHandler } from './upload-form.js';
import { getDataFromServer } from './api.js';
import { renderThumbnails } from './thumbnail-gallery.js';
import { setThumbnailFilters } from './filter.js';
import { setFullSizeModalHandlers } from './full-size-modal.js';
import { showDownloadError } from './message.js';

const initPictureGallery = async () => {
  try {
    const pictures = await getDataFromServer();
    renderThumbnails(pictures);
    setThumbnailFilters(pictures);
    setFullSizeModalHandlers(pictures);
  } catch {
    showDownloadError();
  }
};

addPictureUploadHandler();
initPictureGallery();
