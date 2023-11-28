'use strict';

(() => {

  const createModal = (dialog) => {
    let index = 0;
    let slides = [];
    const title = dialog.querySelector('[data-role="modal-title"]');
    const closeBtn = dialog.querySelector('[data-role="modal-close"]');
    const previewImage = dialog.querySelector('[data-role="preview"]');
    const prevBtn = dialog.querySelector('[data-role="prev-btn"]');
    const nextBtn = dialog.querySelector('[data-role="next-btn"]');

    const open = () => {
      index = 0;
      dialog.showModal();
    };

    const close = () => dialog.close();

    const renderPreview = () => {
      if (!slides[index]) {
        return;
      }

      const imgUrl = slides[index];
      const imgTitleParts = imgUrl.split('/');
      const titleStr = imgTitleParts[imgTitleParts.length - 1];

      requestAnimationFrame(() => {
        title.innerText = titleStr;
        previewImage.src = imgUrl;
      });
    }

    const setImages = (images) => {
      slides = images;
      index = 0;

      renderPreview();
    };

    const preview = (imgUrl) => {
      index = slides.indexOf(imgUrl);

      renderPreview();
    }

    const prevBtnClickHandler = () => {
      index -= 1;
      if (index < 0) {
        index = slides.length - 1;
      }

      renderPreview();
    }

    const nextBtnClickHandler = () => {
      index += 1;
      if (index > slides.length - 1) {
        index = 0;
      }

      renderPreview();
    }

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', prevBtnClickHandler);
    nextBtn.addEventListener('click', nextBtnClickHandler);

    return {
      open,
      close,
      setImages,
      preview,
    };
  }


  document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('[data-role="image"]'));
    const modal = document.querySelector('[data-role="modal"]');

    const dialog = createModal(modal);
    dialog.setImages(images.map(img => img.src));

    const imageClickHandler = (event) => {
      dialog.preview(event.target.src);
      dialog.open();
    };

    images.forEach(image => {
      image.addEventListener('click', imageClickHandler);
    });
  })
})();