'use strict';

(() => {
  const AVAILABLE_IMAGES = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
  ];
  const IMAGE_PATH = 'img';

  document.addEventListener('DOMContentLoaded', () => {
    const generatePreviewBtn = document.querySelector('[data-role="generate-preview-btn"]');
    const preview = document.querySelector('[data-role="preview"]');

    generatePreviewBtn.addEventListener('click', () => {
      const index = Math.floor(Math.random() * 100 % AVAILABLE_IMAGES.length);

      preview.src = `${IMAGE_PATH}/${AVAILABLE_IMAGES[index]}`;
      preview.alt = AVAILABLE_IMAGES[index];
    });
  })
})();