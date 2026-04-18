document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.clickable-image');
  const modal = document.createElement('div');
  modal.classList.add('modal-overlay');
  modal.innerHTML = `
    <span class="modal-close">&times;</span>
    <button class="modal-nav prev hidden">&#10094;</button>
    <img src="" alt="Увеличенное фото">
    <button class="modal-nav next hidden">&#10095;</button>
    <div class="modal-caption"></div>
  `;
  document.body.appendChild(modal);

  const img = modal.querySelector('img');
  const caption = modal.querySelector('.modal-caption');
  const close = modal.querySelector('.modal-close');
  const prev = modal.querySelector('.prev');
  const next = modal.querySelector('.next');

  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    const image = images[index];
    img.src = image.src;
    caption.textContent = image.alt;
    modal.style.display = 'flex';
    prev.classList.toggle('hidden', images.length <= 1);
    next.classList.toggle('hidden', images.length <= 1);
  }

  images.forEach((image, index) => {
    image.addEventListener('click', () => openModal(index));
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  prev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openModal(currentIndex);
  });

  next.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    openModal(currentIndex);
  });
});

console.log("Скрипт подключился успешно!");
alert("Скрипт работает!");
