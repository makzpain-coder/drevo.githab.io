const images = document.querySelectorAll('.clickable-image');
const modal = document.querySelector('.modal-overlay');
const modalImg = modal.querySelector('img');
const modalCaption = modal.querySelector('.modal-caption');

// Проверка
if (!modalCaption) {
  console.error('❌ .modal-caption не найден. Проверьте HTML.');
} else {
  console.log('✅ .modal-caption найден');
}

images.forEach(img => {
  img.addEventListener('click', () => {
    const nameDiv = img.closest('.tree-node').querySelector('.name');
    const personHTML = nameDiv.innerHTML.trim();  // Сохраняем HTML: <br>, <small> и т.д.
    
    modalImg.src = img.src;
modalImg.alt = personHTML;
modalCaption.innerHTML = personHTML;

// Активируем ссылки внутри модального окна
modalCaption.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.stopPropagation(); // Не закрываем модальное окно
    window.open(link.href, '_blank'); // Открываем ссылку
  });
  link.style.cursor = 'pointer';
  link.style.textDecoration = 'none';
});

modal.style.display = 'flex';

    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);
  });
});


// Закрытие по фону
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
});

// Закрытие по крестику
const modalClose = modal.querySelector('.modal-close');
modalClose.addEventListener('click', () => {
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
});

  document.addEventListener("DOMContentLoaded", function () {
    const clickableImages = document.querySelectorAll('.clickable-image');
    const modal = document.getElementById('modalOverlay');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    let imageIndex = 0;
    let imageArray = [];

    function updateImageArray() {
      imageArray = Array.from(clickableImages);
    }

    if (clickableImages.length === 0) {
      console.warn("Нет элементов с классом .clickable-image");
      return;
    }

    clickableImages.forEach((img, index) => {
      img.addEventListener('click', (e) => {
        e.preventDefault();
        updateImageArray();
        imageIndex = imageArray.indexOf(img);

        modalImg.src = img.src;
        modalCaption.textContent = img.alt || "";

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });

    modalPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      imageIndex = (imageIndex - 1 + imageArray.length) % imageArray.length;
      modalImg.src = imageArray[imageIndex].src;
      modalCaption.textContent = imageArray[imageIndex].alt || "";
    });

    modalNext.addEventListener('click', (e) => {
      e.stopPropagation();
      imageIndex = (imageIndex + 1) % imageArray.length;
      modalImg.src = imageArray[imageIndex].src;
      modalCaption.textContent = imageArray[imageIndex].alt || "";
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });
