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

  // Обновляем массив изображений (на случай динамического контента)
  function updateImageArray() {
    imageArray = Array.from(clickableImages);
  }

  if (clickableImages.length === 0) {
    console.warn("Нет элементов с классом .clickable-image");
    return;
  }

  // Функция открытия модального окна
  function openModal(index) {
    updateImageArray();
    imageIndex = index;

    const img = imageArray[imageIndex];
    const nameDiv = img.closest('.tree-node')?.querySelector('.name');

    // Сохраняем HTML (вместо textContent)
    modalImg.src = img.src;
    modalImg.alt = nameDiv ? nameDiv.textContent : '';
    modalCaption.innerHTML = nameDiv ? nameDiv.innerHTML.trim() : '';

    // Разрешаем ссылкам работать
    modalCaption.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open(link.href, '_blank');
      });
      link.style.cursor = 'pointer';
      link.style.textDecoration = 'underline';
      link.style.color = '#007bff';
    });

    modal.style.display = 'flex';
    setTimeout(() => modal.style.opacity = '1', 10);
    document.body.style.overflow = 'hidden';
  }

  // Открытие по клику на изображение
  clickableImages.forEach((img, index) => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(index);
    });
  });

  // Закрытие модального окна
  function closeModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Навигация: вперёд/назад
  modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    imageIndex = (imageIndex - 1 + imageArray.length) % imageArray.length;
    openModal(imageIndex);
  });

  modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    imageIndex = (imageIndex + 1) % imageArray.length;
    openModal(imageIndex);
  });

  // Закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
    if (e.key === 'ArrowLeft' && modal.style.display === 'flex') {
      modalPrev.click();
    }
    if (e.key === 'ArrowRight' && modal.style.display === 'flex') {
      modalNext.click();
    }
  });
});

