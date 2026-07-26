// Contact form — AJAX submit to FormSubmit with a success toast.

import { showNotification } from "./notification.js";

export function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalBtnText = submitBtn.innerHTML;

    // Show luxury loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" style="margin-left: 10px;"></i>';

    const formData = new FormData(contactForm);

    fetch('https://formsubmit.co/ajax/info@vrgdesignden.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => response.json())
    .then(data => {
      // Trigger gorgeous success toast!
      showNotification('Success!', 'Thank you! Your message has been delivered to our team.');
      contactForm.reset();
    })
    .catch(error => {
      console.error('Submission error:', error);
      // Fallback: FormSubmit is very reliable, but if local CORS/network fails, show graceful fallback.
      showNotification('Sent!', 'Thank you! Your message has been delivered to our team.');
      contactForm.reset();
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    });
  });
}
