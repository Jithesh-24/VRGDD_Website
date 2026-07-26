// Toast notification — lazily created, reused on every call.

export function showNotification(title, message) {
  let toast = document.querySelector('.custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
      <div class="toast-icon"><i class="fas fa-check"></i></div>
      <div class="toast-content">
        <h4 class="toast-title"></h4>
        <p class="toast-message"></p>
      </div>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector('.toast-title').textContent = title;
  toast.querySelector('.toast-message').textContent = message;

  // Force reflow
  toast.offsetHeight;

  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}
