const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  imagesContainer: document.querySelector('.js-gallery'),
  gallery: document.querySelector('ul.js-gallery'),
  modalWindow: document.querySelector('div.lightbox'),
  lightboxImg: document.querySelector('img.lightbox__image'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector('div.lightbox__overlay'),
};

const imagesMarkup = createGalleryItem(galleryItems);

refs.imagesContainer.insertAdjacentHTML('beforeend', imagesMarkup);

refs.gallery.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
refs.lightboxOverlay.addEventListener('click', onCloseModal);

function createGalleryItem(images) {
  return images.map(({preview, original, description}) => {
    return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}" 
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  }).join(' ');
}

function onOpenModal(e) {
  e.preventDefault();
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowPress);
  const currentImg = e.target;
  const modalImg = currentImg.getAttribute('data-source');
  refs.modalWindow.classList.add('is-open');
  refs.lightboxImg.src = modalImg;
};

function onCloseModal(e) {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowPress);
  refs.modalWindow.classList.remove('is-open');
  refs.lightboxImg.src = '';
};

function onEscKeyPress(e) {
  const isEscCode = e.code === 'Escape';
  if (isEscCode) {
    onCloseModal();
  }
};

const galleryLinkArr = refs.gallery.querySelectorAll('a.gallery__link');

function onArrowPress(e) {
  const isArrowRightCode = e.code === 'ArrowRight';
  const isArrowLeftCode = e.code === 'ArrowLeft';
  if (isArrowRightCode) {
    for (let i = 0; i < galleryLinkArr.length; i++) {
      if (galleryLinkArr[i].href === refs.lightboxImg.src && galleryLinkArr[galleryLinkArr.length-1].href !== refs.lightboxImg.src) {
        refs.lightboxImg.src = galleryLinkArr[i + 1].href;
        return;
      }
    }
  }
  if (isArrowLeftCode) {
    for (let i = 0; i < galleryLinkArr.length; i++) {
      if (galleryLinkArr[i].href === refs.lightboxImg.src && galleryLinkArr[0].href !== refs.lightboxImg.src) {
        refs.lightboxImg.src = galleryLinkArr[i - 1].href;
        return;
      }
    }
  }
};

