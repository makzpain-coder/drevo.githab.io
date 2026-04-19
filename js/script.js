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

  // Проверка наличия основных элементов
  if (!modal || !modalImg || !modalCaption || !modalClose) {
    console.warn("Отсутствуют необходимые элементы для модального окна.");
    return;
  }

  // Обновляем массив изображений
  function updateImageArray() {
    imageArray = Array.from(document.querySelectorAll('.clickable-image'));
  }

  if (clickableImages.length === 0) {
    console.warn("Нет элементов с классом .clickable-image");
    return;
  }

  // Функция открытия модального окна
function openModal(index) {
  updateImageArray();
  if (imageArray.length === 0) return;

  imageIndex = index;

  const img = imageArray[imageIndex];
  const nameDiv = img.closest('.tree-node')?.querySelector('.name');

  // Загружаем изображение и отображаем
  modalImg.src = img.src;
  modalImg.alt = nameDiv?.textContent.trim() || `Изображение ${imageIndex + 1}`;
  modalCaption.innerHTML = nameDiv?.innerHTML.trim() || '';

  // Делаем ссылки в подписи кликабельными
  modalCaption.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(link.href, '_blank', 'noopener,noreferrer');
    });
    link.setAttribute('tabindex', '0');
    link.style.cursor = 'pointer';
    link.style.textDecoration = 'underline';
    link.style.color = '#007bff';
  });

  // Показываем модальное окно
  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    modal.classList.add('open');  // Добавляем класс для анимации
  });

  // Блокируем прокрутку
  document.body.style.overflow = 'hidden';

  // Фокус на кнопку закрытия
  modalClose.focus();
}

 // Закрытие модального окна
function closeModal() {
  modal.classList.remove('open');  // Убираем класс — анимация исчезновения

  // Ждём окончания анимации, потом скрываем
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';  // Разблокируем прокрутку
  }, 300); // Должно соответствовать времени transition в CSS
}

  // Открытие по клику на изображение
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.matches('.clickable-image')) return;

    e.preventDefault();
    const index = Array.from(clickableImages).indexOf(target);
    if (index !== -1) openModal(index);
  });

  // Закрытие по клику на overlay
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalClose) {
      closeModal();
    }
  });

  // Навигация: вперёд/назад
  modalPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    imageIndex = (imageIndex - 1 + imageArray.length) % imageArray.length;
    openModal(imageIndex);
  });

  modalNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    imageIndex = (imageIndex + 1) % imageArray.length;
    openModal(imageIndex);
  });

 // Управление с клавиатуры
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('open')) return;

  switch (e.key) {
    case 'Escape':
      closeModal();
      break;
    case 'ArrowLeft':
      modalPrev?.click();
      break;
    case 'ArrowRight':
      modalNext?.click();
      break;
  }
});

  // Перезагрузка массива при динамических изменениях (опционально)
  // Например, если изображения подгружаются асинхронно
  const observer = new MutationObserver(() => {
    updateImageArray();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Инициализация массива
  updateImageArray();
});
